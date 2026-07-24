import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <main className="auth-shell"><div className="auth-veil" /><a className="auth-brand" href="/"><span /> FOCUSCREEN</a><section className="auth-copy"><p>START WITH INTENTION</p><h1>Create your focus space.</h1><span>A simple home for your daily goal, priorities, and deep-work sessions.</span></section><div className="auth-card"><SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/" /></div></main>;
}