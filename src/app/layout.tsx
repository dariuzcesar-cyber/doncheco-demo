import type { Metadata, Viewport } from "next";
import AuthModal from "@/components/AuthModal";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { SettingsProvider } from "@/context/SettingsContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don Checo Delicatessen | Tablas de Quesos y Charcutería en Colima",
  description:
    "Tablas de quesos y charcutería gourmet, cléricot artesanal y catering para eventos en Colima. Pide en línea, confirma por WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#800020",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SettingsProvider>
          <AuthProvider>
            <AuthModalProvider>
              <OrdersProvider>
                <CartProvider>
                  <CheckoutProvider>
                    {children}
                    <AuthModal />
                    <CartDrawer />
                    <CheckoutModal />
                  </CheckoutProvider>
                </CartProvider>
              </OrdersProvider>
            </AuthModalProvider>
          </AuthProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
