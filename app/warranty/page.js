"use client";

import Link from "next/link";
import Footer from "../components/Footer";

export default function WarrantyPage() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
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
              <Link href="/#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                About Us
              </Link>
              <Link href="/warranty" className="text-green-600 font-semibold border-b-2 border-green-600">
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
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Warranty & Returns Policy</h1>
          
          {/* Warranty Policy Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h2 className="text-2xl font-bold text-green-700">Warranty Policy</h2>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                This Warranty Policy applies to all electric products purchased from our store. By purchasing our Products, you agree to the terms set forth below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
                  <span className="mr-2">📅</span>Warranty Period
                </h3>
                <p className="text-gray-700">The Products are warranted to be free from defects in materials and workmanship for a period of <strong>12 months</strong> from the date of purchase.</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-800 flex items-center">
                  <span className="mr-2">✅</span>What is Covered
                </h3>
                <p className="text-gray-700">This warranty covers defects in materials and workmanship that prevent the Product from functioning properly. It does not cover damage caused by misuse, abuse, accident, neglect, or unauthorized repair or modification.</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-red-800 flex items-center">
                <span className="mr-2">❌</span>What is Not Covered
              </h3>
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
                <h3 className="text-xl font-semibold mb-3 text-yellow-800 flex items-center">
                  <span className="mr-2">📋</span>How to Make a Claim
                </h3>
                <p className="text-gray-700">To make a warranty claim, please contact the seller from whom you purchased the Product. You will need to provide proof of purchase and a description of the defect. The seller will determine whether the Product is covered under warranty and will advise you on the next steps.</p>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-indigo-800 flex items-center">
                  <span className="mr-2">🔧</span>Remedies
                </h3>
                <p className="text-gray-700">If the Product is found to be defective under warranty, the seller may, at its discretion, repair or replace the Product. You shall bear the transportation costs in case of such repair or replacement. If the Product cannot be repaired or replaced, the seller will refund the purchase price.</p>
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Limitations of Liability</h3>
              <p className="text-gray-700 text-sm">This warranty is the sole and exclusive warranty for the Product. The seller makes no other warranties, express or implied. The seller shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the sale, use, or repair of the Product.</p>
            </div>
          </div>

          {/* Returns Policy Section */}
          <div className="border-t-2 border-gray-200 pt-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-700">Refund and Returns Policy</h2>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                This Return and Refund Policy applies to all electric products purchased from our store. By purchasing our Products, you agree to the terms set forth below.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-800 flex items-center">
                  <span className="mr-2">✅</span>Eligibility for Returns
                </h3>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start"><span className="mr-2 text-green-600">•</span>Product must be unused and in the same condition that you received it</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">•</span>Must be in the original packaging</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">•</span>Products must be returned within <strong>30 days</strong> from the date of purchase</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold mb-3 text-red-700">Non-Returnable Items</h4>
                <div className="bg-red-50 p-4 rounded-lg">
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Products damaged due to misuse, abuse, accident, neglect, or unauthorized repair or modification</li>
                    <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Products with signs of wear and tear or that are not in their original condition</li>
                    <li className="flex items-start"><span className="mr-2 text-red-500">•</span>Any items marked as non-returnable at the time of purchase</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-800 flex items-center">
                  <span className="mr-2">📦</span>Return Process
                </h3>
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <ol className="text-gray-700 space-y-3">
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">1.</span>Contact our customer service team with your order number and reason for return</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">2.</span>Our team will provide you with a Return Merchandise Authorization (RMA) number</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">3.</span>You are responsible for paying the shipping costs for returning your Product</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-purple-600">4.</span>Shipping costs are non-refundable</li>
                  </ol>
                </div>

                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Inspection and Approval</h4>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-gray-700">Once we receive your returned Product, we will inspect it and notify you of the approval or rejection of your return. If your return is approved, we will process your refund or exchange within <strong>7 business days</strong>.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-800 flex items-center">
                  <span className="mr-2">💰</span>Refund Policy
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Refunds:</strong> If your return is approved, you will be eligible for a refund. Refunds will be processed using the original method of payment.</p>
                  <p><strong>Partial Refunds:</strong> May be granted for Products that are not in their original condition, have missing parts, or are returned more than 30 days after delivery.</p>
                  <p><strong>Exclusions:</strong> Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-orange-800 flex items-center">
                  <span className="mr-2">🔄</span>Exchanges
                </h3>
                <p className="text-gray-700 mb-4">We only replace Products if they are defective or damaged upon receipt. If you need to exchange your Product for the same item, contact our customer service team for further assistance.</p>
                <p className="text-gray-700"><strong>Defective Products:</strong> For Products that are defective due to materials or workmanship, please refer to our Warranty Policy above.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center">
                <span className="mr-3">📞</span>Contact Information
              </h3>
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