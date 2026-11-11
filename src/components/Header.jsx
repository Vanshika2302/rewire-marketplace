import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="top">
      <Link to="/" className="logo">ReWire</Link>
      <nav aria-label="Main">
        <NavLink to="/cart" className="btn">Cart <span className="cnt">{count}</span></NavLink>
      </nav>
    </header>
  );
}
