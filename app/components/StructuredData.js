export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Smart Dream Home Lanka",
    "alternateName": "Smart Dream Home",
    "url": "https://www.smartdreamhomelanka.com",
    "logo": "https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp",
    "description": "Leading smart home devices supplier in Sri Lanka. WiFi switches, smart door locks, sensors, automation systems. Island-wide delivery with warranty.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK",
      "addressRegion": "Sri Lanka"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94764511276",
      "contactType": "customer service",
      "availableLanguage": ["English", "Sinhala"]
    },
    "sameAs": [
      "https://wa.me/94764511276"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Sri Lanka"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Smart Home Devices",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Smart Touch Panel Switch"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Smart Door Lock"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Smart MCB"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function ProductSchema({ product }) {
  if (!product) return null;

  const currentPrice = Array.isArray(product.variants) && product.variants.length > 0 
    ? Number(product.variants[0].price) 
    : Number(product.price || 0);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.desc,
    "image": product.images ? product.images.map(img => `https://www.smartdreamhomelanka.com${img}`) : [],
    "brand": {
      "@type": "Brand",
      "name": "Smart Dream Home Lanka"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Smart Dream Home Lanka"
    },
    "offers": {
      "@type": "Offer",
      "price": currentPrice,
      "priceCurrency": "LKR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Smart Dream Home Lanka",
        "url": "https://www.smartdreamhomelanka.com"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "LKR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          }
        }
      },
      "url": `https://www.smartdreamhomelanka.com/products/${product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "50"
    },
    "category": "Smart Home Devices",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Warranty",
        "value": "6-24 months"
      },
      {
        "@type": "PropertyValue",
        "name": "Delivery",
        "value": "Island-wide"
      },
      {
        "@type": "PropertyValue",
        "name": "Country",
        "value": "Sri Lanka"
      }
    ],
    "url": `https://www.smartdreamhomelanka.com/products/${product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}`
  };

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    productSchema.hasVariant = product.variants.map(variant => ({
      "@type": "ProductModel",
      "name": `${product.name} - ${variant.label}`,
      "offers": {
        "@type": "Offer",
        "price": variant.price,
        "priceCurrency": "LKR"
      }
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

export function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Smart Dream Home Lanka",
    "url": "https://www.smartdreamhomelanka.com",
    "description": "Leading smart home devices supplier in Sri Lanka. WiFi switches, smart door locks, sensors, automation systems.",
    "publisher": {
      "@type": "Organization",
      "name": "Smart Dream Home Lanka"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.smartdreamhomelanka.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export function AboutPageSchema() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Smart Dream Home Lanka",
    "description": "Smart Dream Home Sri Lanka – Your trusted source for smart switches, door locks, and home automation solutions. Island-wide delivery & warranty.",
    "url": "https://www.smartdreamhomelanka.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Smart Dream Home Lanka",
      "alternateName": "Smart Dream Home",
      "url": "https://www.smartdreamhomelanka.com",
      "logo": "https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp",
      "description": "Sri Lanka's trusted supplier of smart switches, smart home gadgets, and home automation solutions.",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kandy",
        "addressCountry": "LK",
        "addressRegion": "Sri Lanka"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+94764511276",
        "contactType": "customer service",
        "availableLanguage": ["English", "Sinhala"],
        "areaServed": "LK"
      },
      "sameAs": [
        "https://wa.me/94764511276"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Sri Lanka"
      },
      "knowsAbout": [
        "Smart Switches",
        "Smart Door Locks", 
        "Smart Door Bells",
        "Smart MCBs",
        "Smart Voltage Protectors",
        "Smart IR Controllers",
        "Smart Sensors",
        "Smart Sockets",
        "Home Automation",
        "Polytunnel Solutions"
      ],
      "makesOffer": {
        "@type": "Offer",
        "description": "Smart home devices with 6-24 months warranty",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "LKR"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "LKR"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "businessDays": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            }
          }
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
    />
  );
}
