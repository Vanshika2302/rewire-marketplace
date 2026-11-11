import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => load("rewire-cart", {})); // { [id]: { phone, qty } }
  const [wish, setWish] = useState(() => load("rewire-wish", [])); // [id, id, ...]

  // Save to the browser so the cart survives a refresh.
  useEffect(() => { try { localStorage.setItem("rewire-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("rewire-wish", JSON.stringify(wish)); } catch {} }, [wish]);

  const add = (phone) =>
    setCart((c) => ({ ...c, [phone.id]: { phone, qty: (c[phone.id]?.qty || 0) + 1 } }));

  const change = (id, delta) =>
    setCart((c) => {
      const qty = (c[id]?.qty || 0) + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = { ...c[id], qty };
      return next;
    });

  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((i) => i !== id) : [...w, id]));
  const clear = () => setCart({});

  const items = Object.values(cart);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.phone.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, total, add, change, clear, wish, toggleWish }}>
      {children}
    </CartContext.Provider>
  );
}
