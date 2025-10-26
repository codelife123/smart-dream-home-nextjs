import Link from "next/link";
import Footer from "../components/Footer";
import { AboutPageSchema } from "../components/StructuredData";

export const metadata = {
  title: "About Us | Smart Dream Home Lanka | Smart Home Solutions Sri Lanka",
  description: "Smart Dream Home Sri Lanka – Your trusted source for smart switches, door locks, and home automation solutions. Island-wide delivery & warranty.",
  keywords: "about smart dream home, smart home company Sri Lanka, smart switches Sri Lanka, home automation Sri Lanka, smart devices Kandy, smart home solutions Sri Lanka, smart home supplier Sri Lanka",
  openGraph: {
    title: "About Us | Smart Dream Home Lanka",
    description: "Smart Dream Home offers high-quality smart switches, smart home gadgets, and automation systems in Sri Lanka. Enjoy convenience, security, and energy savings with island-wide delivery and trusted after-sales support.",
    url: "https://www.smartdreamhomelanka.com/about",
    siteName: "Smart Dream Home Lanka",
    images: [
      {
        url: "https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp",
        width: 1200,
        height: 630,
        alt: "Smart Dream Home Lanka - About Us",
      },
    ],
    type: "website",
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Smart Dream Home Lanka",
    description: "Smart Dream Home offers high-quality smart switches, smart home gadgets, and automation systems in Sri Lanka. Enjoy convenience, security, and energy savings with island-wide delivery and trusted after-sales support.",
    images: ["https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp"],
    creator: "@smartdreamhomelk",
  },
  alternates: {
    canonical: "https://www.smartdreamhomelanka.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <AboutPageSchema />
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
              Smart Dream Home
            </Link>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/#products" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Products
              </Link>
              <Link href="/about" className="text-green-600 font-semibold border-b-2 border-green-600">
                About Us
              </Link>
              <Link href="/warranty" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Warranty & Returns
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Services
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">About Smart Dream Home</h1>
          
          {/* Introduction Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h2 className="text-2xl font-bold text-green-700">Sri Lanka&apos;s Trusted Smart Home Supplier</h2>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
				  Welcome to Smart Dream Home, Sri Lanka&apos;s trusted supplier of smart switches, smart home gadgets, and home automation solutions. We specialize in bringing the latest smart home technology to your doorstep—making your home more convenient, secure, and energy-efficient.
              </p>
            </div>
          </div>

          {/* Location & Products Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                <span className="mr-2">📍</span>Located in Kandy, Sri Lanka
              </h3>
              <p className="text-gray-700 mb-4">
                Smart Dream Home offers a wide range of innovative products including Smart Switches, Smart Door Locks, Smart Door Bells, Smart MCBs, Smart Voltage Protectors (RCCB), Smart IR Controllers, Smart Sensors, and Smart Sockets.
              </p>
              <p className="text-gray-700">
                We also provide advanced systems such as Automatic Polytunnel Solutions for modern agriculture.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-800 flex items-center">
                <span className="mr-2">🔧</span>Quality & Warranty
              </h3>
              <p className="text-gray-700 mb-4">
                All our products are imported directly from China and tested for high quality and durability, with 6–24 months warranty depending on the product.
              </p>
              <p className="text-gray-700">
                We deliver island-wide and work with hardware shops, contractors, and online customers across Sri Lanka.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-yellow-700">Our Mission</h2>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                At Smart Dream Home, our goal is to make smart living affordable and accessible to everyone. Whether you want to control your home from your phone, automate your lighting, or secure your property remotely, we have the perfect solution for you.
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <span className="text-2xl">💳</span>
              </div>
              <h2 className="text-2xl font-bold text-indigo-700">Payment & Service</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-indigo-800 flex items-center">
                  <span className="mr-2">💳</span>Payment Methods
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-center"><span className="mr-2 text-indigo-600">•</span>Bank Transfer</li>
                  <li className="flex items-center"><span className="mr-2 text-indigo-600">•</span>PayPal</li>
                  <li className="flex items-center"><span className="mr-2 text-indigo-600">•</span>Local Payment Options</li>
                </ul>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-800 flex items-center">
                  <span className="mr-2">🛠️</span>After-Sales Service
                </h3>
                <p className="text-gray-700">
                  We provide dedicated after-sales service to ensure customer satisfaction. Our team is committed to supporting you throughout your smart home journey.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h2 className="text-2xl font-bold text-red-700">Why Choose Smart Dream Home?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold mb-2 text-red-800">Sri Lanka&apos;s No.1"</h3>
                <p className="text-gray-700 text-sm">Leading smart home solutions provider</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🚚</div>
                <h3 className="text-lg font-semibold mb-2 text-orange-800">Island-wide Delivery</h3>
                <p className="text-gray-700 text-sm">We deliver to all parts of Sri Lanka</p>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-lg font-semibold mb-2 text-pink-800">Quality Guaranteed</h3>
                <p className="text-gray-700 text-sm">6-24 months warranty on all products</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center">
              <span className="mr-3">📞</span>Get in Touch
            </h3>
            <p className="text-gray-700 mb-6">
              Ready to transform your home with smart technology? Contact us today for expert advice and personalized solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="https://wa.me/94764511276" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center">
                <span className="mr-2">💬</span>
                <span className="font-semibold">WhatsApp: 076 451 1276</span>
              </a>
              <a href="mailto:smartdreamhomelk2025@gmail.com" className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center">
                <span className="mr-2">📧</span>
                <span className="font-semibold text-blue-600">smartdreamhomelk2025@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors shadow-lg"
          >
            <span className="mr-2">🏠</span>
            Back to Home
          </Link>
        </div>
      </main>

      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/94764511276" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-colors"
      >
        💬
      </a>

      <Footer />
    </div>
  );
}
