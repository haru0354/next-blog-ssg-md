import type { Metadata } from "next";
import Image from "next/image";
import parse from "html-react-parser";
import {
  getArticle,
  getArticles,
} from "@/app/component/lib/service/articleService";
import Breadcrumbs from "@/app/component/content-area/Breadcrumbs";
import ArticleInArticleList from "@/app/component/content-area/related-articles/ArticleInArticleList";
import NotFound from "@/app/not-found";

export const generateMetadata = async ({
  params,
}: {
  params: { article_slug: string };
}): Promise<Metadata> => {
  const article = await getArticle(params.article_slug);

  if (!article) {
    return {
      title: "404NotFound（記事がありません）",
      description:
        "記事がありません。指定されたファイルまたはディレクトリは存在しません。",
    };
  }

  return {
    title: article.frontmatter?.title,
    description: article.frontmatter?.description,
    openGraph: {
      title: article.frontmatter?.title,
      description: article.frontmatter?.description,
    },
  };
};

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    article_slug: article.slug,
    category_slug: article.frontmatter?.categorySlug,
  }));
}

const page = async ({
  params,
}: {
  params: { article_slug: string; category_slug: string };
}) => {
  const article = await getArticle(params.article_slug);

  if (!article) {
    return <NotFound />;
  }

  return (
    <>
      <div className="content p-4 bg-white border border-gray-200">
        <Breadcrumbs
          categorySlug={params.category_slug}
          categoryName={article.frontmatter?.categoryName}
        />
        <h1 className="text-2xl font-semibold mx-2 my-4">
          {article.frontmatter?.title}
        </h1>
        <Image
          src={`/image_webp/${article.frontmatter?.eyeCatchName}.webp`}
          alt={`${article.frontmatter?.eyeCatchAlt}`}
          width={750}
          height={493}
          className="mx-auto"
        />
        <p className="my-2 mx-2 mb-6 text-gray-600">
          投稿日：{article.frontmatter?.date}
        </p>
        {parse(article.contentHtml)}
      </div>
      <ArticleInArticleList
        column={true}
        categoryName={article.frontmatter?.categoryName}
        articleSlug={params.article_slug}
      />
    </>
  );
};

export default page;
