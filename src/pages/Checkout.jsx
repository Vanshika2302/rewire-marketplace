import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { usd } from "../components/PhoneCard.jsx";

const FIELDS = [
  ["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Mobile number", "tel"],
  ["address", "Address", "text"], ["zip", "PIN or ZIP code", "text"],
];

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(f.phone)) e.phone = "Enter a 10 digit mobile number.";
  if (f.address.trim().length < 8) e.address = "Enter your full address.";
  if (!/^\d{5,6}$/.test(f.zip)) e.zip = "Enter a 5 or 6 digit code.";
  return e;
}

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", zip: "" });
  const [errors, setErrors] = useState({});

  if (!items.length) return <Navigate to="/cart" replace />;

  function submit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    clear();
    navigate("/success", { state: { name: form.name.trim() } });
  }

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2>Delivery details</h2>
      {FIELDS.map(([key, label, type]) => (
        <label className="f" key={key} style={{ marginBottom: 12 }}>{label}
          <input type={type} value={form[key]} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `e-${key}` : undefined}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
          {errors[key] && <span className="err" id={`e-${key}`}>{errors[key]}</span>}
        </label>
      ))}
      <div className="line"><span>Total to pay</span><span className="sum">{usd(total)}</span></div>
      <button type="submit">Place order</button>
    </form>
  );
}
