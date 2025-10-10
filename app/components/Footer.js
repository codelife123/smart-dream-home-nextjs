"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">Smart Dream Home</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for smart home devices across Sri Lanka. 
              Quality products with warranty and island-wide support.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://wa.me/94764511276" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a 
                href="tel:+94764511276" 
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                aria-label="Phone"
              >
                📞
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#warranty" className="text-gray-300 hover:text-green-400 transition-colors">
                  Warranty & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Smart Device Installation</li>
              <li>• Island-wide Delivery</li>
              <li>• Technical Support</li>
              <li>• Warranty Service</li>
              <li>• WhatsApp Assistance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <a href="tel:+94764511276" className="hover:text-green-400 transition-colors">
                  +94 76 451 1276
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>💬</span>
                <a 
                  href="https://wa.me/94764511276" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌍</span>
                <span>Island-wide Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏰</span>
                <span>24/7 WhatsApp Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Smart Dream Home. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span>Warranty: 6-24 months</span>
              <span>•</span>
              <span>Quality Guaranteed</span>
              <span>•</span>
              <span>Sri Lanka Wide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}