import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <>
      <Header isTopPage={true}/>
      <main>
        <TopNewArticle />
        <TopCategory />
      </main>
      <Footer />
    </>
  );
}
