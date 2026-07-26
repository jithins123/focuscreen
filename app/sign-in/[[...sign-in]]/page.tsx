import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <div className="auth-veil" />
      <a className="auth-brand" href="/"><span /> FOCUSCREEN</a>
      <section className="auth-copy">
        <p>YOUR CALM WORKSPACE</p>
        <h1>Return to what matters.</h1>
        <div className="auth-intro">Focuscreen is a free daily workspace designed to help you choose what matters, work with intention, and finish the day with a clearer mind.</div>
        <ul className="auth-benefits">
          <li><strong>Plan your day</strong><span>Set one clear goal, three priorities, and a lightweight to-do list.</span></li>
          <li><strong>Find your focus</strong><span>Use a flexible timer, calming scenery, and optional focus sounds.</span></li>
          <li><strong>Your data stays on your machine</strong><span>Your goals and tasks are stored locally in this browser, not on our servers.</span></li>
        </ul>
        <div className="auth-free"><span>FREE TO USE</span><i />NO CREDIT CARD REQUIRED</div>
      </section>
      <div className="auth-card"><SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/" /></div>
    </main>
  );
}