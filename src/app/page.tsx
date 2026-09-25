import Catalog from "@/components/Catalog";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <Catalog />
      </main>
      <Footer />
    </>
  );
}
