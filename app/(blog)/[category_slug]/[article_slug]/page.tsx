import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
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

const page = async ({
  params,
}: {
  params: { article_slug: string; category_slug: string };
}) => {
  const article = await getArticle(params.article_slug);

  return (
    <div className="content p-4 bg-white">
      <Breadcrumbs
        categorySlug={params.category_slug}
        categoryName={article.frontmatter.category}
      />
      <h1 className="text-2xl font-semibold mx-2 my-4">
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
  );
};

export default page;
