import Footer from "../component/layouts/Footer";
import Header from "../component/layouts/Header";
import SideMenu from "../component/layouts/SideMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex justify-center mb-20">
        <div className="max-w-[1150px] flex flex-wrap justify-center">
          <div className="flex flex-col flex-wrap w-full md:w-[800px] md:mr-6">
            {children}
          </div>
          <SideMenu />
        </div>
      </main>
      <Footer />
    </>
  );
}
