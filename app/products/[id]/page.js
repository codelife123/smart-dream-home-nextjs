"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../data/products";
import Footer from "../../components/Footer";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const slugify = (s) => s?.toLowerCase()?.trim()?.replace(/[^a-z0-9\s-]/g, "")?.replace(/\s+/g, "-") ?? "";
  const product = useMemo(() => {
    const byId = PRODUCTS.find(p => p.id === productParam);
    if(byId) return byId;
    const paramSlug = slugify(String(productParam || ""));
    return PRODUCTS.find(p => slugify(p.name) === paramSlug);
  }, [productParam]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [pendingImageIdx, setPendingImageIdx] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState(1); // 1 = next (left), -1 = prev (right)
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [isHoveringMain, setIsHoveringMain] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, relX: 0.5, relY: 0.5 });
  const imageWrapRef = useRef(null);
  const thumbsRef = useRef(null);
  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;

  useEffect(() => {
    setVariantIndex(0);
    setActiveImageIdx(0);
  }, [productParam]);

  // Keyboard navigation for gallery
  useEffect(() => {
    function onKey(e){
      if(!product?.images?.length) return;
      if(e.key === 'ArrowLeft'){
        startSlide((activeImageIdx - 1 + product.images.length) % product.images.length, -1);
      } else if(e.key === 'ArrowRight'){
        startSlide((activeImageIdx + 1) % product.images.length, 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, activeImageIdx]);

  const zoomFactor = 2;
  const lensSize = 160;
  function handleMouseMove(e){
    const wrap = imageWrapRef.current;
    if(!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));
    const relX = rect.width ? clampedX / rect.width : 0.5;
    const relY = rect.height ? clampedY / rect.height : 0.5;
    setLensPos({ x: clampedX, y: clampedY, relX, relY });
  }

  function startSlide(toIdx, dir){
    if(toIdx === activeImageIdx) return;
    setSlideDir(dir);
    setPendingImageIdx(toIdx);
    setIsSliding(false);
  }

  function onSlideEnd(){
    if(pendingImageIdx === null) return;
    setActiveImageIdx(pendingImageIdx);
    setPendingImageIdx(null);
    setIsSliding(false);
  }

  // When a new pending image is set, kick off the slide on the next frame
  useEffect(() => {
    if(pendingImageIdx !== null){
      const id = requestAnimationFrame(() => setIsSliding(true));
      return () => cancelAnimationFrame(id);
    }
  }, [pendingImageIdx]);

  // Auto-advance main image every 3 seconds; pause on hover
  useEffect(() => {
    if(!product?.images?.length || product.images.length < 2) return;
    if(isHoveringMain) return;
    const id = setInterval(() => {
      startSlide((activeImageIdx + 1) % product.images.length, 1);
    }, 3000);
    return () => clearInterval(id);
  }, [product, isHoveringMain, activeImageIdx]);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gallery */}
            <div>
              <div
                ref={imageWrapRef}
                className="relative group rounded-2xl overflow-hidden bg-gray-50"
                onMouseEnter={() => { setIsZoomVisible(true); setIsHoveringMain(true); }}
                onMouseLeave={() => { setIsZoomVisible(false); setIsHoveringMain(false); }}
                onMouseMove={handleMouseMove}
              >
                {product.images && product.images.length ? (
                  <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
                    {/* Current slide */}
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: isSliding ? `translateX(${slideDir === 1 ? '-100%' : '100%'})` : 'translateX(0%)',
                        transition: isSliding ? 'transform 320ms ease' : 'none'
                      }}
                    >
                      <Image
                        src={product.images[activeImageIdx]}
                        alt={product.name}
                        fill
                        sizes="(min-width: 768px) 520px, 100vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                    {/* Incoming slide */}
                    {pendingImageIdx !== null ? (
                      <div
                        className="absolute inset-0"
                        style={{
                          transform: isSliding ? 'translateX(0%)' : `translateX(${slideDir === 1 ? '100%' : '-100%'})`,
                          transition: 'transform 320ms ease'
                        }}
                        onTransitionEnd={onSlideEnd}
                      >
                        <Image
                          src={product.images[pendingImageIdx]}
                          alt={product.name}
                          fill
                          sizes="(min-width: 768px) 520px, 100vw"
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {isZoomVisible && !isSliding && product.images && product.images.length ? (
                  <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: `scale(${zoomFactor})`,
                        transformOrigin: `${lensPos.relX * 100}% ${lensPos.relY * 100}%`,
                      }}
                    >
                      <Image
                        src={product.images[activeImageIdx]}
                        alt="zoom"
                        fill
                        sizes="(min-width: 1024px) 520px, 100vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                ) : null}
                {product.images && product.images.length > 1 ? (
                  <>
                    <button
                      aria-label="Previous image"
                      onClick={() => startSlide((activeImageIdx - 1 + product.images.length) % product.images.length, -1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ‹
                    </button>
                    <button
                      aria-label="Next image"
                      onClick={() => startSlide((activeImageIdx + 1) % product.images.length, 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ›
                    </button>
                  </>
                ) : null}
              </div>
              {product.images && product.images.length ? (
                <div className="mt-4 relative">
                  <div ref={thumbsRef} className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                    {product.images.map((src, idx) => (
                      <button
                        key={src + idx}
                        onClick={() => startSlide(idx, idx > activeImageIdx ? 1 : -1)}
                        className={`relative shrink-0 rounded-xl border ${idx === activeImageIdx ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-200'} overflow-hidden`}
                        style={{width:88, height:88}}
                        aria-label={`Thumbnail ${idx+1}`}
                      >
                        <Image src={src} alt="thumb" width={88} height={88} className="w-[88px] h-[88px] object-cover" />
                      </button>
                    ))}
                  </div>
                  {/* Always-visible gallery scroll buttons */}
                  {product.images.length > 3 ? (
                    <>
                      <button
                        aria-label="Scroll thumbnails left"
                        onClick={() => { if(thumbsRef.current){ thumbsRef.current.scrollBy({ left: -200, behavior: 'smooth' }); } }}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full w-8 h-8 shadow flex items-center justify-center"
                      >
                        ‹
                      </button>
                      <button
                        aria-label="Scroll thumbnails right"
                        onClick={() => { if(thumbsRef.current){ thumbsRef.current.scrollBy({ left: 200, behavior: 'smooth' }); } }}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full w-8 h-8 shadow flex items-center justify-center"
                      >
                        ›
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
            {/* Content */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{product.name}</h1>
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-3">Rs. {currentPrice.toLocaleString()}</div>
              <p className="text-gray-700 text-base md:text-lg mb-5">{product.desc}</p>
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
                <input className="w-24 p-2 border rounded" type="number" min={1} value={qty} onChange={(e)=> setQty(Math.max(1, Number(e.target.value) || 1))} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={addToCart} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold">🛒 Add to Cart</button>
                <a href={`https://wa.me/94764511276?text=${encodeURIComponent(product.name)}`} target="_blank" className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold">Enquiry via WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        {(product.description_en || product.description_si || product.youtubevideo || product.youtubeVideo) && (
          <div className="bg-white rounded-2xl p-6 shadow mt-6">
            {(() => {
              const yt = product.youtubevideo || product.youtubeVideo || "";
              const getEmbed = (url) => {
                if(!url) return "";
                try {
                  if(url.includes('/embed/')) return url;
                  const u = new URL(url);
                  if(u.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${u.pathname.replace('/', '')}`;
                  const v = u.searchParams.get('v');
                  if(v) return `https://www.youtube.com/embed/${v}`;
                  return url;
                } catch { return url; }
              };
              const embed = getEmbed(yt);
              return embed ? (
                <div className="mb-6">
                  <div className="relative" style={{paddingBottom:'56.25%', height:0, overflow:'hidden', borderRadius:12}}>
                    <iframe src={embed} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}></iframe>
                  </div>
                </div>
              ) : null;
            })()}

            {product.description_en ? (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Description</h2>
                <p className="whitespace-pre-line text-gray-800">{product.description_en}</p>
              </div>
            ) : null}

            {product.description_si ? (
              <div>
                <h2 className="text-xl font-bold mb-2">විස්තරය</h2>
                <p className="whitespace-pre-line text-gray-800">{product.description_si}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


