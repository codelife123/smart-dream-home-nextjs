"use client";

import { useMemo, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../data/products";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = useMemo(() => PRODUCTS.find(p => p.id === productId), [productId]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;

  useEffect(() => {
    setVariantIndex(0);
  }, [productId]);

  if(!product){
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button className="text-sm text-blue-600" onClick={() => router.push("/")}>← Back</button>
        <h1 className="text-2xl font-bold mt-4">Product not found</h1>
      </div>
    );
  }

  const currentPrice = hasVariants ? Number(product.variants[variantIndex].price) : Number(product.price || 0);

  function addToCart(){
    const CART_KEY = 'sdh_cart_v1';
    const variantLabel = hasVariants ? product.variants[variantIndex].label : '';
    const item = {
      key: `${product.id}-${variantLabel}`,
      id: product.id,
      name: product.name,
      variant: variantLabel,
      price: currentPrice,
      qty: qty
    };
    try {
      const existing = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const found = existing.find((c) => c.key === item.key);
      if(found){ found.qty += item.qty; }
      else { existing.push(item); }
      localStorage.setItem(CART_KEY, JSON.stringify(existing));
      alert('Added to cart');
    } catch(_){ /* noop */ }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button className="text-sm text-blue-600" onClick={() => router.push("/")}>← Back to Home</button>
          <Link href="/" className="relative bg-white p-2 rounded-full shadow" title="Open cart on Home">
            <span role="img" aria-label="cart">🛒</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex flex-col md:flex-row gap-6">
            {product.images && product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} width={320} height={320} className="w-full md:w-80 h-80 object-cover rounded" />
            ) : null}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.desc}</p>
              <div className="text-green-700 font-semibold mb-4">Rs. {currentPrice.toLocaleString()}</div>
              {hasVariants && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Variant</label>
                  <select className="border p-2 rounded w-full" value={variantIndex} onChange={(e)=> setVariantIndex(Number(e.target.value))}>
                    {product.variants.map((v, i) => (
                      <option key={v.label} value={i}>{v.label} — Rs. {Number(v.price).toLocaleString()}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex items-center gap-3 mb-6">
                <label className="text-sm">Qty:</label>
                <input className="w-20 p-2 border rounded" type="number" min={1} value={qty} onChange={(e)=> setQty(Math.max(1, Number(e.target.value) || 1))} />
              </div>
              <div className="flex gap-3">
                <button onClick={addToCart} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">🛒 Add to Cart</button>
                <a href={`https://wa.me/94764511276?text=${encodeURIComponent(product.name)}`} target="_blank" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Enquiry via WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


