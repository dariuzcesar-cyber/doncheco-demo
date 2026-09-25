import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
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

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

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
    <html lang="es-MX" className={`${jost.variable} ${cormorant.variable}`}>
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
