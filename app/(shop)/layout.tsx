import SideNav from "@/components/sideNav";
import Footer from "@/components/ui/home/footer";
import Header from "@/components/ui/home/header";
import { CartProvider } from "@/context/cart-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div>
        <Header />
        
        <SideNav>{children}</SideNav>
        <Footer />
      </div>
    </CartProvider>
  );
}
