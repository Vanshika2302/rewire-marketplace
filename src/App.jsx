import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import { Loader } from "./components/States.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

// Code splitting: these pages load only when the user visits them.
const PhoneDetail = lazy(() => import("./pages/PhoneDetail.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Success = lazy(() => import("./pages/Success.jsx"));

export default function App() {
  return (
    <div className="wrap">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phone/:id" element={<PhoneDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<p className="empty">Page not found.</p>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
