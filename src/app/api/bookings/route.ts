import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { notifyTelegram } from "@/lib/telegram";
import { verifyTurnstile } from "@/lib/turnstile";
import { bookingSchema, fieldErrors } from "@/lib/validation";

export async function POST(req: Request) {
  const ip = await getClientIp();
  const limit = rateLimit(`booking:${ip}`, 5, 10 * 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalidJson" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot filled → pretend success so bots learn nothing.
  if (data.website) return NextResponse.json({ ok: true }, { status: 201 });

  if (!(await verifyTurnstile(data.captchaToken, ip))) {
    return NextResponse.json({ error: "captcha" }, { status: 400 });
  }

  const service = await prisma.service.findFirst({ where: { id: data.serviceId, isVisible: true }, select: { id: true, nameEn: true, nameUk: true, price: true } });
  if (!service) return NextResponse.json({ errors: { serviceId: "serviceRequired" } }, { status: 422 });

  await prisma.booking.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      serviceId: service.id,
      serviceName: service.nameEn,
      date: new Date(`${data.date}T00:00:00Z`),
      time: data.time,
      message: data.message || null,
      locale: data.locale,
    },
  });

  await notifyTelegram([
    ["Name", data.fullName],
    ["Phone", data.phone],
    ["Service", `${service.nameEn} / ${service.nameUk}`],
    ["Date", `${data.date.split("-").reverse().join(".")} ${data.time}`],
    ["Message", data.message],
    ["Language", data.locale.toUpperCase()],
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
