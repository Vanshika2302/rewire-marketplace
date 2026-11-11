import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { usd } from "../components/PhoneCard.jsx";

export default function Cart() {
  const { items, total, change } = useCart();
  if (!items.length)
    return (
      <section className="panel empty">
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">Browse phones</Link>
      </section>
    );
  return (
    <section className="panel">
      <h2>Your cart</h2>
      {items.map(({ phone, qty }) => (
        <div className="line" key={phone.id}>
          <span><strong>{phone.title}</strong><br /><span className="meta">{phone.condition}</span></span>
          <span className="qty">
            <button className="ghost" aria-label={`Remove one ${phone.title}`} onClick={() => change(phone.id, -1)}>−</button>
            {qty}
            <button className="ghost" aria-label={`Add one ${phone.title}`} onClick={() => change(phone.id, 1)}>+</button>
          </span>
          <strong>{usd(phone.price * qty)}</strong>
        </div>
      ))}
      <div className="line"><span>Total</span><span className="sum">{usd(total)}</span></div>
      <div className="row">
        <Link to="/" className="btn ghost">Keep shopping</Link>
        <Link to="/checkout" className="btn">Go to checkout</Link>
      </div>
    </section>
  );
}
