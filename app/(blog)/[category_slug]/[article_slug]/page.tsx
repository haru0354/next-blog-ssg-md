import { getArticle, getArticles } from "@/app/component/lib/ArticleService";
import SideMenu from "@/app/component/SideMenu";
import parse from "html-react-parser";
import Image from "next/image";

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    params: {
      article_slug: article.slug,
    },
  }));
}

const page = async ({ params }: { params: { article_slug: string } }) => {
  const article = await getArticle(params.article_slug);

  return (
    <main className="flex justify-center">
      <div className="max-w-[1150px] flex flex-wrap justify-center my-10">
        <div className="flex flex-col w-full md:w-[800px] p-4 md:mr-6 bg-white">
          <h1 className="text-2xl font-semibold mx-2 mb-4">
            {article.frontmatter.title}
          </h1>
          <Image
            src={`/${article.frontmatter.eyeCatchName}`}
            alt={`${article.frontmatter.eyeCatchAlt}`}
            width={750}
            height={493}
            className="mx-auto"
          />
          <p className="my-2 mx-2 mb-6 text-gray-600">
            投稿日：{article.frontmatter.date}
          </p>
          {parse(article.contentHtml)}
        </div>
        <div className="flex flex-col w-full md:w-[300px] mt-4 md:mt-0 bg-white">
          <SideMenu />
        </div>
      </div>
    </main>
  );
};

export default page;
