import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/site/Logo";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center px-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,149,90,0.2),transparent_55%)]" />
      <div className="relative w-full max-w-sm">
        <div className="mb-10 text-center">
          <Logo name="Admin Panel" />
          <p className="mt-4 text-sm text-cocoa/60">Sign in to manage bookings, services and site content.</p>
        </div>
        <div className="rounded-xl border border-cocoa/10 bg-white p-7 shadow-2xl shadow-cocoa/10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
