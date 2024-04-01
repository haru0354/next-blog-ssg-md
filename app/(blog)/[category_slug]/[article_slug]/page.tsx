import { getArticle, getArticles } from "@/app/component/lib/ArticleService";

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
    <div>
      {article.frontmatter.title}
      {article.contentHtml}
    </div>
  );
};

export default page;
