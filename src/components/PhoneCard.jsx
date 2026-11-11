import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export const usd = (n) => `₹${n.toLocaleString("en-IN")}`;
export const badgeClass = (c) => `badge b-${c.split(" ")[0]}`;

export default function PhoneCard({ phone }) {
  const { add, wish, toggleWish } = useCart();
  const saved = wish.includes(phone.id);
  return (
    <article className="card">
      <button
        className="heart" aria-pressed={saved}
        aria-label={`${saved ? "Remove" : "Save"} ${phone.title} ${saved ? "from" : "to"} wishlist`}
        onClick={() => toggleWish(phone.id)}
      >
        {saved ? "♥" : "♡"}
      </button>
      <Link to={`/phone/${phone.id}`}>
        <img src={phone.thumbnail} alt={phone.title} loading="lazy" width="200" height="200" />
      </Link>
      <h3>{phone.title}</h3>
      <span className={badgeClass(phone.condition)}>{phone.condition}</span>
      <div className="meta">{phone.brand} · Rated {phone.rating}/5</div>
      <div className="price">{usd(phone.price)}</div>
      <div className="row">
        <Link to={`/phone/${phone.id}`} className="btn ghost">Details</Link>
        <button onClick={() => add(phone)}>Add to cart</button>
      </div>
    </article>
  );
}
