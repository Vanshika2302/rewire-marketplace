const BASE = "https://dummyjson.com/products";
const CONDITIONS = ["Like new", "Good", "Fair"];

const withCondition = (p) => ({ ...p, price: Math.round(p.price * 83), condition: CONDITIONS[p.id % 3] });

async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Could not load phones. Please try again.");
  return res.json();
}

export async function getPhones(signal) {
  const data = await request(`${BASE}/category/smartphones?limit=30`, signal);
  return data.products.map(withCondition);
}

export async function getPhone(id, signal) {
  return withCondition(await request(`${BASE}/${id}`, signal));
}
