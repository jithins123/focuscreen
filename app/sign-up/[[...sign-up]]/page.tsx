import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="auth-shell">
      <div className="auth-veil" />
      <a className="auth-brand" href="/"><span /> FOCUSCREEN</a>
      <section className="auth-copy">
        <p>START WITH INTENTION</p>
        <h1>Create your focus space.</h1>
        <div className="auth-intro">Focuscreen gives you a calm, free workspace for your daily goal, priorities, focus sessions, and the small tasks in between.</div>
        <ul className="auth-benefits">
          <li><strong>Everything for today</strong><span>One goal, three priorities, a focus timer, and a simple to-do list.</span></li>
          <li><strong>A space that feels good</strong><span>Choose calming backgrounds and play optional focus sounds.</span></li>
          <li><strong>Your data stays on your machine</strong><span>Your plans are stored locally in this browser, giving you a private, lightweight workspace.</span></li>
        </ul>
        <div className="auth-free"><span>FREE TO USE</span><i />NO CREDIT CARD REQUIRED</div>
      </section>
      <div className="auth-card"><SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/" /></div>
    </main>
  );
}