import TopNewArticle from "./component/top-page/TopNewArticle";
import TopCategory from "./component/top-page/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <>
      <Header isTopPage={true}/>
      <main className="pb-20">
        <TopNewArticle />
        <TopCategory />
      </main>
      <Footer />
    </>
  );
}
