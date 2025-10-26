import { PRODUCTS } from "../../data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const productParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const slugify = (s) => s?.toLowerCase()?.trim()?.replace(/[^a-z0-9\s-]/g, "")?.replace(/\s+/g, "-") ?? "";
  
  const product = PRODUCTS.find(p => p.id === productParam) || 
    PRODUCTS.find(p => slugify(p.name) === slugify(String(productParam || "")));

  if (!product) {
    return {
      title: "Product Not Found | Smart Dream Home Lanka",
      description: "The requested product could not be found. Browse our smart home devices collection.",
    };
  }

  const currentPrice = Array.isArray(product.variants) && product.variants.length > 0 
    ? Number(product.variants[0].price) 
    : Number(product.price || 0);

  const title = `${product.name} | Smart Dream Home Lanka | Smart Devices Sri Lanka`;
  const description = `${product.desc} Buy ${product.name} in Sri Lanka. Price: Rs. ${currentPrice.toLocaleString()}. Island-wide delivery, warranty included. Smart home automation devices.`;

  return {
    title,
    description,
    keywords: `${product.name}, smart home Sri Lanka, WiFi devices Sri Lanka, home automation, smart switches Sri Lanka, ${product.name.toLowerCase()} price Sri Lanka, smart devices Colombo`,
    openGraph: {
      title: `${product.name} | Smart Dream Home Lanka`,
      description: `${product.desc} Price: Rs. ${currentPrice.toLocaleString()}. Island-wide delivery, warranty included.`,
      url: `https://www.smartdreamhomelanka.com/products/${product.slug || slugify(product.name)}`,
      siteName: "Smart Dream Home Lanka",
      images: [
        {
          url: product.images && product.images[0] ? `https://www.smartdreamhomelanka.com${product.images[0]}` : "https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp",
          width: 1200,
          height: 630,
          alt: `${product.name} - Smart Dream Home Lanka`,
        },
      ],
      type: "website",
      locale: "en_LK",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Smart Dream Home Lanka`,
      description: `${product.desc} Price: Rs. ${currentPrice.toLocaleString()}. Island-wide delivery, warranty included.`,
      images: [product.images && product.images[0] ? `https://www.smartdreamhomelanka.com${product.images[0]}` : "https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp"],
      creator: "@smartdreamhomelk",
    },
    alternates: {
      canonical: `https://www.smartdreamhomelanka.com/products/${product.slug || slugify(product.name)}`,
    },
  };
}

export default function ProductDetail() {
  return <ProductDetailClient />;
}


