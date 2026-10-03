/**
 * Create an admin or reset an existing admin's password.
 * Usage: npm run admin:create -- <login> "<password>"  (login can be a username or an email)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [emailArg, password] = process.argv.slice(2);
  const email = emailArg?.toLowerCase().trim();
  if (!email || !password) {
    console.error('Usage: npm run admin:create -- <login> "<password>"');
    process.exit(1);
  }
  if (password.length < 10) console.warn("! Weak password — use at least 10 characters in production");
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({ where: { email }, create: { email, passwordHash }, update: { passwordHash } });
  console.log(`✔ Admin ${email} is ready`);
}

main().finally(() => prisma.$disconnect());
