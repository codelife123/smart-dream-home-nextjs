import "./globals.css";

export const metadata = {
  title: "Smart Dream Home — Shop",
  description: "Island-wide smart devices — quality products with warranty.",
  openGraph: {
    title: "Smart Dream Home — Shop",
    description: "Island-wide smart devices — quality products with warranty.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="si">
      <body>
        {children}
      </body>
    </html>
  );
}
