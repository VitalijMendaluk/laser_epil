import "server-only";

const escape = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

/** Sends a booking notification to Telegram. Never throws — a failed notification must not lose the booking. */
export async function notifyTelegram(lines: [label: string, value: string | null | undefined][]) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = ["<b>🌸 Новая заявка / New booking</b>", "", ...lines.filter(([, v]) => v).map(([k, v]) => `<b>${escape(k)}:</b> ${escape(v!)}`)].join("\n");
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("[telegram]", res.status, await res.text().catch(() => ""));
  } catch (error) {
    console.error("[telegram]", error);
  }
}
