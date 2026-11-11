import { useMemo, useState } from "react";
import useAsync from "../hooks/useAsync.js";
import useDebounce from "../hooks/useDebounce.js";
import { getPhones } from "../api/phones.js";
import PhoneCard from "../components/PhoneCard.jsx";
import { Loader, ErrorMessage } from "../components/States.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Home() {
  const { data: phones, loading, error, retry } = useAsync(getPhones);
  const { wish } = useCart();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("All");
  const [cond, setCond] = useState("All");
  const [max, setMax] = useState(150000);
  const [sort, setSort] = useState("low");
  const [savedOnly, setSavedOnly] = useState(false);
  const search = useDebounce(q);

  const brands = useMemo(() => ["All", ...new Set((phones || []).map((p) => p.brand))], [phones]);

  const shown = useMemo(() => {
    const list = (phones || []).filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (brand === "All" || p.brand === brand) &&
        (cond === "All" || p.condition === cond) &&
        p.price <= max &&
        (!savedOnly || wish.includes(p.id))
    );
    const by = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rate: (a, b) => b.rating - a.rating };
    return list.sort(by[sort]);
  }, [phones, search, brand, cond, max, sort, savedOnly, wish]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <>
      <section className="hero">
        <h1>Used phones, tested and ready to use.</h1>
        <p>Every phone is inspected, graded and comes with a 6 month warranty.</p>
      </section>
      <div className="bar" role="search">
        <label className="f full">Search
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try iPhone or Galaxy" />
        </label>
        <label className="f">Brand
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((b) => <option key={b}>{b}</option>)}</select>
        </label>
        <label className="f">Condition
          <select value={cond} onChange={(e) => setCond(e.target.value)}>{["All", "Like new", "Good", "Fair"].map((c) => <option key={c}>{c}</option>)}</select>
        </label>
        <label className="f">Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rate">Best rated</option>
          </select>
        </label>
        <label className="f">Max price: ₹{max.toLocaleString("en-IN")}
          <input type="range" min="5000" max="150000" step="5000" value={max} onChange={(e) => setMax(+e.target.value)} />
        </label>
      </div>
      <div className="row" style={{ alignItems: "center", marginBottom: 12 }}>
        <p className="meta" role="status" style={{ flex: 1, margin: 0 }}>{shown.length} phones found</p>
        <button className="ghost" aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)} style={{ flex: "none" }}>♥ Saved only ({wish.length})</button>
      </div>
      {shown.length ? (
        <div className="grid">{shown.map((p) => <PhoneCard key={p.id} phone={p} />)}</div>
      ) : (
        <p className="empty">No phones match these filters. Try a higher price or a different brand.</p>
      )}
    </>
  );
}
