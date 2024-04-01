import { getArticle, getArticles } from "@/app/component/lib/ArticleServise";

const page = async ({ params }: { params: { article_slug: string } }) => {
  const article = await getArticle(params.article_slug);
  const articles = await getArticles();
  console.log("article:", article);
  console.log("articles:", articles);

  return <div></div>;
};

export default page;
