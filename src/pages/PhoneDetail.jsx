import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { getPhone } from "../api/phones.js";
import { Loader, ErrorMessage } from "../components/States.jsx";
import { useCart } from "../context/CartContext.jsx";
import { usd, badgeClass } from "../components/PhoneCard.jsx";

export default function PhoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { data: phone, loading, error, retry } = useAsync((s) => getPhone(id, s), [id]);
  const [img, setImg] = useState(0);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <section className="panel">
      <Link to="/" className="btn ghost">Back to phones</Link>
      <div className="two">
        <div>
          <img className="big-img" src={phone.images[img] || phone.thumbnail} alt={phone.title} />
          <div className="thumbs">
            {phone.images.slice(0, 4).map((src, i) => (
              <button key={src} className="ghost" aria-label={`Show photo ${i + 1}`} aria-pressed={i === img} onClick={() => setImg(i)}>
                <img src={src} alt="" width="48" height="48" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2>{phone.title}</h2>
          <p><span className={badgeClass(phone.condition)}>{phone.condition}</span></p>
          <p className="price">{usd(phone.price)}</p>
          <p>{phone.description}</p>
          <p className="meta">Brand: {phone.brand}<br />Rating: {phone.rating}/5<br />In stock: {phone.stock}<br />Warranty: 6 months</p>
          <div className="row">
            <button className="ghost" onClick={() => add(phone)}>Add to cart</button>
            <button onClick={() => { add(phone); navigate("/cart"); }}>Buy now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
