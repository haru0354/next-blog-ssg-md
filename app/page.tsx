import Image from "next/image";
import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";

export default function Home() {
  return (
    <main>
      <TopNewArticle />
      <TopCategory />
    </main>
  );
}
