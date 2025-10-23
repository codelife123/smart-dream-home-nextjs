"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "./data/products";
import NavMenus from "./components/NavMenus";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  const [modalImgSrc, setModalImgSrc] = useState("");
  useEffect(() => {
    const slides = document.querySelectorAll('#slides > div');
    let currentSlide = 0;
    function showSlide(idx){
      slides.forEach((s,i)=>{ s.classList.toggle('opacity-100', i===idx); s.classList.toggle('opacity-0', i!==idx); });
      currentSlide = idx;
    }
    function nextSlide(){ if(slides.length) showSlide((currentSlide+1) % slides.length); }
    const slideInterval = setInterval(nextSlide, 5000);
    showSlide(0);
    document.querySelectorAll('#dots .dot').forEach((d,i)=> d.addEventListener('click', ()=> showSlide(i)));

    // menus behavior moved into NavMenus component

    // PRODUCTS now imported from ./data/products

    function formatPriceRange(p){
      if(Array.isArray(p.variants) && p.variants.length){
        const prices = p.variants.map(v=>Number(v.price)).sort((a,b)=>a-b);
        return `Rs. ${prices[0].toLocaleString()} - ${prices[prices.length-1].toLocaleString()}`;
      }
      return p.price ? `Rs. ${Number(p.price).toLocaleString()}` : 'Contact for price';
    }

    function renderProducts(){
      const grid = document.getElementById('productGrid');
      if(!grid) return;
      grid.innerHTML = '';
      PRODUCTS.forEach(p=>{
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow p-4 text-center cursor-pointer product-card';
        card.setAttribute('data-id', p.id);
        card.setAttribute('data-name', p.name);
        card.setAttribute('data-img', (p.images && p.images[0]) || '');
        card.setAttribute('data-desc', p.desc || '');
        if(Array.isArray(p.variants) && p.variants.length){
          p.variants.forEach(v=>{
            const label = (v.label||'').toLowerCase();
            if(label.includes('1')) card.setAttribute('data-price-g1', String(v.price));
            if(label.includes('2')) card.setAttribute('data-price-g2', String(v.price));
            if(label.includes('3')) card.setAttribute('data-price-g3', String(v.price));
            if(label.includes('4')) card.setAttribute('data-price-g4', String(v.price));
          });
        } else if(p.price){
          card.setAttribute('data-price', String(p.price));
        }

        const imgSrc = (p.images && p.images[0]) || '';
        const priceText = Array.isArray(p.variants) && p.variants.length
          ? `${formatPriceRange(p)} (1-4 gang)`
          : formatPriceRange(p);

        card.innerHTML = `
          <img src="${imgSrc}" alt="" class="mx-auto mb-3 rounded">
          <h3 class="font-bold text-lg">${p.name}</h3>
          <p class="text-gray-600">${priceText}</p>
          <button class="viewDetail bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-3">View Details</button>
        `;
        grid.appendChild(card);
      });
    }

    renderProducts();

    const productModal = document.getElementById('productModal');
    const closeProductModal = document.getElementById('closeProductModal');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const variantWrap = document.getElementById('variantWrap');
    const variantSelect = document.getElementById('variantSelect');
    const modalQty = document.getElementById('modalQty');
    const addToCartBtn = document.getElementById('addToCartBtn');

    let currentProduct = null;

    document.addEventListener('click', (e) => {
      const card = (e.target instanceof Element) ? e.target.closest('.product-card') : null;
      if(card && (e.target instanceof Element) && e.target.classList.contains('viewDetail')){
        const id = card.dataset.id || '';
        const product = PRODUCTS.find(p => p.id === id);
        const slugify = (s) => s?.toLowerCase()?.trim()?.replace(/[^a-z0-9\s-]/g, "")?.replace(/\s+/g, "-") ?? "";
        if(product){
          const slug = product.slug || slugify(product.name);
          router.push(`/products/${slug}`);
        }
      }
    });

    variantSelect?.addEventListener('change', ()=>{
      try {
        const v = JSON.parse(variantSelect.value);
        modalPrice.textContent = `Rs. ${Number(v.price).toLocaleString()} (${v.label})`;
      } catch(_){ /* noop */ }
    });

    const onCloseModal = () => { productModal.classList.add('hidden'); productModal.classList.remove('flex','items-center','justify-center'); setModalImgSrc(""); };
    closeProductModal?.addEventListener('click', onCloseModal);
    productModal?.addEventListener('click', e=>{ if(e.target === productModal){ onCloseModal(); } });

    const CART_KEY = 'sdh_cart_v1';
    function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }catch(e){return [];} }
    function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
    function updateCartCount(){ const cart = loadCart(); const count = cart.reduce((s,i)=>s+i.qty,0); const el = document.getElementById('cartCount'); if(el) el.textContent = String(count); }
    updateCartCount();

    addToCartBtn?.addEventListener('click', ()=>{
      if(!currentProduct) return;
      const qty = Number(modalQty?.value) || 1;
      let price = 0, variantLabel = '';
      if(!variantWrap?.classList.contains('hidden')){
        try{ const v = JSON.parse(variantSelect.value); price = Number(v.price); variantLabel = v.label; }catch(_){ price = 0; }
      } else {
        price = Number(currentProduct.raw.price || 0);
      }
      const cart = loadCart();
      const key = `${currentProduct.id}-${variantLabel}`;
      const existing = cart.find(c=>c.key===key);
      if(existing){ existing.qty += qty; }
      else { cart.push({ key, id: currentProduct.id, name: currentProduct.name, variant: variantLabel, price, qty }); }
      saveCart(cart);
      onCloseModal();
      alert('Added to cart');
    });

    const openCartBtn = document.getElementById('openCartBtn');
    const cartSection = document.getElementById('cart');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const backToShop = document.getElementById('backToShop');

    function renderCart(){
      const cart = loadCart();
      if(!cartItemsDiv || !cartTotalSpan) return;
      cartItemsDiv.innerHTML = '';
      let total = 0;
      if(cart.length===0){
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      } else {
        cart.forEach((item, idx)=>{
          const line = document.createElement('div');
          line.className = 'p-3 border rounded flex justify-between items-center';
          const left = document.createElement('div');
          left.innerHTML = `<div class="font-semibold">${item.name}${item.variant? ' — '+item.variant : ''}</div>
                            <div class="text-sm text-gray-600">Rs. ${Number(item.price).toLocaleString()} × ${item.qty}</div>`;
          const right = document.createElement('div');
          right.innerHTML = `<div class="font-semibold">Rs. ${(Number(item.price)*item.qty).toLocaleString()}</div>
                             <div class="flex gap-2 mt-2">
                               <button data-idx="${idx}" class="decrease px-2 py-1 bg-gray-200 rounded">-</button>
                               <button data-idx="${idx}" class="increase px-2 py-1 bg-gray-200 rounded">+</button>
                               <button data-idx="${idx}" class="remove px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                             </div>`;
          line.appendChild(left); line.appendChild(right);
          cartItemsDiv.appendChild(line);
          total += Number(item.price) * item.qty;
        });
      }
      cartTotalSpan.textContent = String(Math.round(total));
      cartItemsDiv.querySelectorAll('.decrease').forEach(b=> b.addEventListener('click', e=>{
        const i = Number(e.currentTarget.getAttribute('data-idx')); const cart = loadCart();
        if(cart[i].qty>1) cart[i].qty--; else cart.splice(i,1);
        saveCart(cart); renderCart();
      }));
      cartItemsDiv.querySelectorAll('.increase').forEach(b=> b.addEventListener('click', e=>{
        const i = Number(e.currentTarget.getAttribute('data-idx')); const cart = loadCart();
        cart[i].qty++; saveCart(cart); renderCart();
      }));
      cartItemsDiv.querySelectorAll('.remove').forEach(b=> b.addEventListener('click', e=>{
        const i = Number(e.currentTarget.getAttribute('data-idx')); const cart = loadCart();
        cart.splice(i,1); saveCart(cart); renderCart();
      }));
    }

    const onOpenCart = () => {
      renderCart();
      document.querySelectorAll('section').forEach(s=> s.classList.add('hidden'));
      cartSection?.classList.remove('hidden');
      if(cartSection) window.scrollTo({ top: cartSection.offsetTop - 20, behavior: 'smooth' });
    };
    openCartBtn?.addEventListener('click', onOpenCart);

    backToShop?.addEventListener('click', ()=>{
      cartSection?.classList.add('hidden');
      document.querySelectorAll('section').forEach(s=> s.classList.remove('hidden'));
      highlightTabs();
    });

    const enquiryOverlay = document.getElementById('enquiryOverlay');
    const closeEnquiry = document.getElementById('closeEnquiry');
    const enquiryForm = document.getElementById('enquiryForm');
    const cancelEnquiry = document.getElementById('cancelEnquiry');
    document.getElementById('openEnquiryFromModal')?.addEventListener('click', ()=>{
      onCloseModal();
      enquiryOverlay?.classList.remove('hidden'); enquiryOverlay?.classList.add('flex','items-center','justify-center');
    });
    closeEnquiry?.addEventListener('click', ()=>{ enquiryOverlay?.classList.add('hidden'); enquiryOverlay?.classList.remove('flex','items-center','justify-center'); });
    cancelEnquiry?.addEventListener('click', ()=>{ enquiryOverlay?.classList.add('hidden'); enquiryOverlay?.classList.remove('flex','items-center','justify-center'); });
    enquiryOverlay?.addEventListener('click', e=>{ if(e.target === enquiryOverlay){ enquiryOverlay?.classList.add('hidden'); enquiryOverlay?.classList.remove('flex','items-center','justify-center'); } });
    enquiryForm?.addEventListener('submit', e=>{
      e.preventDefault();
      const name = (document.getElementById('enqName'))?.value?.trim() || '';
      const phone = (document.getElementById('enqPhone'))?.value?.trim() || '';
      const prod = (document.getElementById('enqProduct'))?.value || 'N/A';
      const msg = (document.getElementById('enqMsg'))?.value?.trim() || '';
      const text = `Enquiry from ${name}%0APhone: ${phone}%0AProduct: ${prod}%0AMessage: ${msg}`;
      window.open(`https://wa.me/94764511276?text=${encodeURIComponent(text)}`, '_blank');
      enquiryForm.reset(); enquiryOverlay?.classList.add('hidden'); enquiryOverlay?.classList.remove('flex','items-center','justify-center');
    });

    return () => {
      clearInterval(slideInterval);
      openCartBtn?.removeEventListener('click', onOpenCart);
      closeProductModal?.removeEventListener('click', onCloseModal);
    };
  }, [router]);

  return (
    <div className="bg-gray-100 text-gray-800">
      <header className="fixed top-4 left-4 z-50">
        <a href="#home" className="bg-white px-3 py-2 rounded-lg shadow">Smart Dream Home</a>
      </header>

      <div className="fixed top-4 right-4 z-50">
        <button id="openCartBtn" className="relative bg-white p-3 rounded-full shadow">
          <span role="img" aria-label="cart">🛒</span>
          <span id="cartCount" className="bg-red-500 text-white rounded-full px-1" style={{position:'absolute', top:'-6px', right:'-6px', fontSize:'12px'}}>0</span>
        </button>
      </div>

      <section id="home" className="relative w-full h-screen overflow-hidden">
        <div id="slides" className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style={{backgroundImage:"url('/images/home/slide1.jpg')"}}></div>
          <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style={{backgroundImage:"url('/images/home/slide4.jpeg')"}}></div>
          <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style={{backgroundImage:"url('/images/home/slide5.jpg')"}}></div>
          <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style={{backgroundImage:"url('/images/home/slide3.jpeg')"}}></div>
          <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style={{backgroundImage:"url('/images/home/slide2.jpeg')"}}></div>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6 hero-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 fade">Welcome to Smart Dream Home</h1>
          <p className="text-lg md:text-xl mb-6 fade">Island-wide smart devices — quality products with warranty.</p>
          <a href="#products" className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-full shadow fade">View Products</a>
        </div>
        <NavMenus />
        <div id="dots" className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          <button className="w-3 h-3 rounded-full bg-gray-300 dot"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 dot"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 dot"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 dot"></button>
        </div>
      </section>

      <section id="products" className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div id="productGrid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
      </section>

      <section id="about" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="text-center text-gray-700">Smart Dream Home supplies a wide range of smart home devices across Sri Lanka. Support & warranty available.</p>
      </section>

      <section id="warranty" className="max-w-6xl mx-auto py-12 px-4 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Warranty & Returns Policy</h2>
          
          {/* Warranty Policy Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-green-700">Warranty Policy</h3>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                This Warranty Policy applies to all electric products purchased from our store. By purchasing our Products, you agree to the terms set forth below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
                  <span className="mr-2">📅</span>Warranty Period
                </h4>
                <p className="text-gray-700">The Products are warranted to be free from defects in materials and workmanship for a period of <strong>12 months</strong> from the date of purchase.</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-purple-800 flex items-center">
                  <span className="mr-2">✅</span>What is Covered
                </h4>
                <p className="text-gray-700">This warranty covers defects in materials and workmanship that prevent the Product from functioning properly. It does not cover damage caused by misuse, abuse, accident, neglect, or unauthorized repair or modification.</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-4 text-red-800 flex items-center">
                <span className="mr-2">❌</span>What is Not Covered
              </h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Damage caused by misuse, abuse, accident, neglect, or unauthorized repair or modification</li>
                <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Damage caused by natural disasters, such as lightning, floods, or earthquakes</li>
                <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Damage caused by power surges or spikes</li>
                <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Damage caused by incompatibility with other devices or software</li>
                <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Normal wear and tear</li>
                <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Any damages caused by exceeding the specified maximum wattage and current ratings</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800 flex items-center">
                  <span className="mr-2">📋</span>How to Make a Claim
                </h4>
                <p className="text-gray-700">To make a warranty claim, please contact the seller from whom you purchased the Product. You will need to provide proof of purchase and a description of the defect. The seller will determine whether the Product is covered under warranty and will advise you on the next steps.</p>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-indigo-800 flex items-center">
                  <span className="mr-2">🔧</span>Remedies
                </h4>
                <p className="text-gray-700">If the Product is found to be defective under warranty, the seller may, at its discretion, repair or replace the Product. You shall bear the transportation costs in case of such repair or replacement. If the Product cannot be repaired or replaced, the seller will refund the purchase price.</p>
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Limitations of Liability</h4>
              <p className="text-gray-700 text-sm">This warranty is the sole and exclusive warranty for the Product. The seller makes no other warranties, express or implied. The seller shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the sale, use, or repair of the Product.</p>
            </div>
          </div>

          {/* Returns Policy Section */}
          <div className="border-t-2 border-gray-200 pt-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-700">Refund and Returns Policy</h3>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                This Return and Refund Policy applies to all electric products purchased from our store. By purchasing our Products, you agree to the terms set forth below.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-green-800 flex items-center">
                  <span className="mr-2">✅</span>Eligibility for Returns
                </h4>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start"><span className="mr-2 text-green-600">•</span>Product must be unused and in the same condition that you received it</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">•</span>Must be in the original packaging</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">•</span>Products must be returned within <strong>30 days</strong> from the date of purchase</li>
                  </ul>
                </div>

                <h5 className="text-lg font-semibold mb-3 text-red-700">Non-Returnable Items</h5>
                <div className="bg-red-50 p-4 rounded-lg">
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Products damaged due to misuse, abuse, accident, neglect, or unauthorized repair or modification</li>
                    <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Products with signs of wear and tear or that are not in their original condition</li>
                    <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Any items marked as non-returnable at the time of purchase</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-purple-800 flex items-center">
                  <span className="mr-2">📦</span>Return Process
                </h4>
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <ol className="text-gray-700 space-y-3">
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">1.</span>Contact our customer service team with your order number and reason for return</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">2.</span>Our team will provide you with a Return Merchandise Authorization (RMA) number</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">3.</span>You are responsible for paying the shipping costs for returning your Product</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">4.</span>Shipping costs are non-refundable</li>
                  </ol>
                </div>

                <h5 className="text-lg font-semibold mb-3 text-indigo-700">Inspection and Approval</h5>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-gray-700">Once we receive your returned Product, we will inspect it and notify you of the approval or rejection of your return. If your return is approved, we will process your refund or exchange within <strong>7 business days</strong>.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-teal-800 flex items-center">
                  <span className="mr-2">💰</span>Refund Policy
                </h4>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Refunds:</strong> If your return is approved, you will be eligible for a refund. Refunds will be processed using the original method of payment.</p>
                  <p><strong>Partial Refunds:</strong> May be granted for Products that are not in their original condition, have missing parts, or are returned more than 30 days after delivery.</p>
                  <p><strong>Exclusions:</strong> Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-orange-800 flex items-center">
                  <span className="mr-2">🔄</span>Exchanges
                </h4>
                <p className="text-gray-700 mb-4">We only replace Products if they are defective or damaged upon receipt. If you need to exchange your Product for the same item, contact our customer service team for further assistance.</p>
                <p className="text-gray-700"><strong>Defective Products:</strong> For Products that are defective due to materials or workmanship, please refer to our Warranty Policy above.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-xl text-center">
              <h4 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center">
                <span className="mr-3">📞</span>Contact Information
              </h4>
              <p className="text-gray-700 mb-4">If you have any questions about our Return and Refund Policy or Warranty Policy, please contact us at:</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="mailto:smartdreamhomelk2025@gmail.com" className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center">
                  <span className="mr-2">📧</span>
                  <span className="font-semibold text-blue-600">smartdreamhomelk2025@gmail.com</span>
                </a>
                <a href="tel:+94764511276" className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center">
                  <span className="mr-2">📱</span>
                  <span className="font-semibold text-green-600">076 451 1276</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
        <ul className="text-center text-gray-700 space-y-2">
          <li>• Installation of smart devices</li>
          <li>• Island-wide delivery & support</li>
          <li>• Online ordering & WhatsApp assistance</li>
          <li>• Warranty & maintenance</li>
        </ul>
      </section>

      <div id="productModal" className="fixed inset-0 bg-black bg-opacity-60 hidden z-50 items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-4 max-w-2xl w-full relative">
          <button id="closeProductModal" className="absolute top-3 right-3 text-gray-700 font-bold">✖</button>
          <div className="flex flex-col md:flex-row gap-4">
            {modalImgSrc ? (
              <Image id="modalImg" src={modalImgSrc} alt="product" width={192} height={192} className="w-full md:w-48 h-48 object-cover rounded-lg" />
            ) : null}
            <div className="flex-1">
              <h3 id="modalName" className="text-2xl font-bold mb-2"></h3>
              <p id="modalPrice" className="text-green-600 font-semibold mb-3"></p>
              <p id="modalDesc" className="text-gray-700 mb-4"></p>
              <div id="variantWrap" className="mb-3 hidden">
                <label className="block text-sm font-medium mb-1">Variant:</label>
                <select id="variantSelect" className="border p-2 rounded w-full"></select>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm">Qty:</label>
                <input id="modalQty" type="number" min="1" defaultValue="1" className="w-20 p-1 border rounded" />
              </div>
              <div className="flex gap-3">
                <button id="addToCartBtn" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">🛒 Add to Cart</button>
                <button id="openEnquiryFromModal" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Enquiry Form</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="cart" className="hidden max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
        <div id="cartItems" className="space-y-3 mb-4"></div>
        <div className="text-right font-bold text-xl mb-6">Total: Rs. <span id="cartTotal">0</span></div>
        <h3 className="text-lg font-semibold mb-2">Customer information</h3>
        <form id="checkoutForm" className="grid grid-cols-1 gap-3 max-w-xl">
          <input id="custName" type="text" placeholder="Your name" className="p-2 border rounded" required />
          <input id="custPhone" type="text" placeholder="Phone (e.g. 0764511276)" className="p-2 border rounded" required />
          <textarea id="custAddress" placeholder="Address / Notes" className="p-2 border rounded" rows={3} required></textarea>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Order</button>
            <button type="button" id="backToShop" className="bg-gray-200 px-4 py-2 rounded">Continue Shopping</button>
          </div>
        </form>
        <div id="orderSuccess" className="hidden mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <h4 className="font-bold">Order confirmed — thank you!</h4>
          <p id="orderSummaryText" className="text-sm mt-2"></p>
        </div>
      </section>

      <a id="whatsappFloat" href="https://wa.me/94764511276" target="_blank" className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center">💬</a>

      <div id="enquiryOverlay" className="fixed inset-0 bg-black bg-opacity-60 hidden z-50 items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
          <button id="closeEnquiry" className="absolute top-3 right-3 text-gray-700 font-bold">✖</button>
          <h3 className="text-xl font-bold mb-3">Send Enquiry</h3>
          <form id="enquiryForm" className="grid gap-3">
            <input id="enqName" type="text" placeholder="ඔබේ නම / Your name" className="p-2 border rounded" required />
            <input id="enqPhone" type="text" placeholder="Phone" className="p-2 border rounded" required />
            <select id="enqProduct" className="p-2 border rounded">
              <option value="">Select product (optional)</option>
            </select>
            <textarea id="enqMsg" rows={4} placeholder="Message" className="p-2 border rounded" required></textarea>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Send via WhatsApp</button>
              <button type="button" id="cancelEnquiry" className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
