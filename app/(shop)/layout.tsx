import SideNav from "@/components/sideNav";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div>first layout after RootLayout
      <Header />
        <SideNav>{children}</SideNav>
        <Footer />
    </div>
  )
}