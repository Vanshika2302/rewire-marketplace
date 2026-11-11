# ReWire: Used Phone Marketplace

A responsive online marketplace for tested, graded used phones, built with React.

## Features
- Browse phones loaded from a REST API (loading, error and retry states)
- Search (debounced), filter by brand, condition and price, and sort
- Product detail page with photo gallery
- Cart with quantities, saved in `localStorage`
- Wishlist, and a "saved only" view
- Checkout form with field validation and an order confirmation page
- Responsive layout, light and dark theme, keyboard focus styles, ARIA labels

## Tech stack
React 18, Vite, React Router 6, Context API, plain CSS. Data from the [DummyJSON](https://dummyjson.com) smartphones API.

## Run locally
```bash
npm install
npm run dev
```
Build for production with `npm run build`.

## Project structure
```
src/
  api/         phones.js        all network requests
  hooks/       useAsync.js      loading, error and data handling
               useDebounce.js   delays search while typing
  context/     CartContext.jsx  cart and wishlist state
  components/  Header, PhoneCard, States (Loader, ErrorMessage)
  pages/       Home, PhoneDetail, Cart, Checkout, Success
```

## Decisions
- **Context API for the cart**: the state is small and shared across pages, so Redux would be overkill.
- **`useAsync` hook**: one reusable pattern for loading and errors, with request cancellation.
- **Lazy-loaded routes**: the detail, checkout and success pages load only when visited.
- **`useMemo` for filtering**: the list is recomputed only when a filter changes.

## Ideas to extend
Pagination, URL-based filters, unit tests with Vitest, and a real backend.

## Screenshots
Add screenshots here and a live link after deploying to Vercel.
