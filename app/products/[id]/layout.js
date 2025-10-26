import { PRODUCTS } from "../../data/products";

const slugify = (s) => s?.toLowerCase()?.trim()?.replace(/[^a-z0-9\s-]/g, "")?.replace(/\s+/g, "-") ?? "";

export function generateMetadata({ params }){
  const param = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const byId = PRODUCTS.find(p => p.id === param);
  const product = byId || PRODUCTS.find(p => (p.slug || slugify(p.name)) === slugify(String(param || "")));
  if(!product){
    return { title: "Product — Smart Dream Home" };
  }
  const title = `${product.name} — Smart Dream Home`;
  const description = product.desc || product.description_en || "Smart product";
  const image = product.images?.[0] || "/images/smart-switch/image1.webp";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image]
    },
  };
}

export default function ProductLayout({ children }){
  return children;
}


