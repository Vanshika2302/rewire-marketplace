import { Link, useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  return (
    <section className="panel empty">
      <h2>Order placed{state?.name ? `, ${state.name}` : ""}.</h2>
      <p>We’ve sent a confirmation to your email. Your phone ships in 1 to 2 days.</p>
      <Link to="/" className="btn">Continue shopping</Link>
    </section>
  );
}
