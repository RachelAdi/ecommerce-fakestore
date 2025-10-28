import "./globals.css";
import Header from "./components/Header/Header";

export const metadata = {
  title: "My FakeStore",
  description: "Ecommerce project using Fake Store API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
