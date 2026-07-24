import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <main className="auth-shell"><div className="auth-veil" /><a className="auth-brand" href="/"><span /> FOCUSCREEN</a><section className="auth-copy"><p>YOUR CALM WORKSPACE</p><h1>Return to what matters.</h1><span>Sign in to open your goals, tasks, timer, and focus music.</span></section><div className="auth-card"><SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/" /></div></main>;
}