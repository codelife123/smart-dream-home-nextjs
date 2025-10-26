import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { OrganizationSchema, WebsiteSchema } from './components/StructuredData';

export const metadata = {
  title: "Smart Dream Home Lanka | Smart Home Devices Sri Lanka | WiFi Switches & Automation",
  description: "Leading smart home devices supplier in Sri Lanka. WiFi switches, smart door locks, sensors, automation systems. Island-wide delivery with warranty. Shop smart switches, MCB, RCCB, door locks & more.",
  keywords: "smart home Sri Lanka, WiFi switches Sri Lanka, smart door locks, home automation Sri Lanka, smart switches Colombo, smart devices Sri Lanka, WiFi switches, smart MCB, smart RCCB, door locks Sri Lanka, smart sensors, home automation",
  authors: [{ name: "Smart Dream Home Lanka" }],
  creator: "Smart Dream Home Lanka",
  publisher: "Smart Dream Home Lanka",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Smart Dream Home Lanka | Smart Home Devices Sri Lanka",
    description: "Leading smart home devices supplier in Sri Lanka. WiFi switches, smart door locks, sensors, automation systems. Island-wide delivery with warranty.",
    url: "https://www.smartdreamhomelanka.com",
    siteName: "Smart Dream Home Lanka",
    images: [
      {
        url: "https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp",
        width: 1200,
        height: 630,
        alt: "Smart Dream Home Lanka - Smart Home Devices",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Dream Home Lanka | Smart Home Devices Sri Lanka",
    description: "Leading smart home devices supplier in Sri Lanka. WiFi switches, smart door locks, sensors, automation systems. Island-wide delivery with warranty.",
    images: ["https://www.smartdreamhomelanka.com/images/smart_touch_panel.webp"],
    creator: "@smartdreamhomelk",
  },
  alternates: {
    canonical: "https://www.smartdreamhomelanka.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="si">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body>
        {children}
		<Analytics />
      </body>
    </html>
  );
}
