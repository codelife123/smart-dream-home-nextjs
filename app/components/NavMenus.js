"use client";

import { useEffect } from "react";

export default function NavMenus() {
  useEffect(() => {
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileTabs = document.getElementById('mobileTabs');
    const desktopTabs = document.querySelectorAll('#tabs .tab');
    const mobTabs = document.querySelectorAll('#mobileTabs .tab');
    const sections = document.querySelectorAll('section');

    const onMobileToggle = (e) => { e.stopPropagation(); mobileTabs?.classList.toggle('show'); mobileTabs?.classList.toggle('hide'); };
    mobileBtn?.addEventListener('click', onMobileToggle);
    const onDocClick = (e) => { if(mobileTabs && mobileTabs.classList.contains('show') && !mobileTabs.contains(e.target) && e.target !== mobileBtn){ mobileTabs.classList.remove('show'); mobileTabs.classList.add('hide'); } };
    document.addEventListener('click', onDocClick);

    function highlightTabs(){
      let current='home';
      sections.forEach(sec=>{ if(window.pageYOffset >= sec.offsetTop - 120) current = sec.id; });
      desktopTabs.forEach(tab=>{ tab.classList.toggle('tab-active', tab.getAttribute('href') === '#'+current); });
      mobTabs.forEach(tab=>{ tab.classList.toggle('tab-active', tab.getAttribute('href') === '#'+current); });
    }
    window.addEventListener('scroll', highlightTabs);
    highlightTabs();
    document.querySelectorAll('#tabs .tab, #mobileTabs .tab').forEach(tab=>{
      tab.addEventListener('click', e=>{
        const target = document.querySelector(tab.getAttribute('href'));
        if(target){ e.preventDefault(); window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' }); }
        if(mobileTabs?.classList.contains('show')){ mobileTabs.classList.remove('show'); mobileTabs.classList.add('hide'); }
      });
    });

    return () => {
      mobileBtn?.removeEventListener('click', onMobileToggle);
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('scroll', highlightTabs);
    };
  }, []);

  return (
    <>
      <div id="tabs" className="hidden md:flex flex-col space-y-4 fixed top-1/3 right-6 z-30">
        <a href="#home" className="tab bg-green-600 text-white px-4 py-2 rounded-l-full font-bold text-center shadow">Home</a>
        <a href="#products" className="tab bg-red-500 text-white px-4 py-2 rounded-l-full font-bold text-center shadow">Products</a>
        <a href="/about" className="tab bg-blue-500 text-white px-4 py-2 rounded-l-full font-bold text-center shadow">About Us</a>
        <a href="/warranty" className="tab bg-yellow-500 text-white px-4 py-2 rounded-l-full font-bold text-center shadow">Warranty & Returns</a>
        <a href="#services" className="tab bg-purple-600 text-white px-4 py-2 rounded-l-full font-bold text-center shadow">Our Services</a>
      </div>
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button id="mobileBtn" className="bg-green-600 text-white p-3 rounded-full shadow-lg focus:outline-none">☰</button>
        <div id="mobileTabs" className="hide bg-white rounded-xl shadow-lg p-2 mt-2">
          <a href="#home" className="tab bg-green-600 text-white px-4 py-2 rounded-lg text-center shadow mb-2">Home</a>
          <a href="#products" className="tab bg-red-500 text-white px-4 py-2 rounded-lg text-center shadow mb-2">Products</a>
          <a href="/about" className="tab bg-blue-500 text-white px-4 py-2 rounded-lg text-center shadow mb-2">About Us</a>
          <a href="/warranty" className="tab bg-yellow-500 text-white px-4 py-2 rounded-lg text-center shadow mb-2">Warranty & Returns</a>
          <a href="#services" className="tab bg-purple-600 text-white px-4 py-2 rounded-lg text-center shadow">Our Services</a>
        </div>
      </div>
    </>
  );
}


