import ProductsHub from "@/components/revamp/ProductsHub";

export const metadata = {
  title: "Products | Qmo + Grdr by Map2Close",
  description: "Qmo gives reps live AI coaching on every sales call. Grdr grades every call and deal in seconds. Pick the one that fits your team.",
  alternates: { canonical: "https://map2close.com/products" },
  openGraph: { title: "Products | Qmo + Grdr by Map2Close", url: "https://map2close.com/products" },
};

export default function ProductsPage() {
  return <ProductsHub />;
}
