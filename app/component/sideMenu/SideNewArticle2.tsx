import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const SideNewArticle2 = async () => {
  const articles = await getArticles();
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 5);

  return (
    <nav className="bg-white mt-8 border-r border-l border-gray-200">
      <p className="w-full p-4 bg-gray-800 text-white font-bold">新着記事</p>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={`/${article.frontmatter.category}/${article.slug}`}
              key={article.slug}
            >
              <div className="hover:bg-blue-100">
                <Image
                  src={`/${article.frontmatter.eyeCatchName}`}
                  alt={`${article.frontmatter.eyeCatchAlt}`}
                  width={282}
                  height={100}
                  className="mx-auto"
                />
                <p className="border-b border-gray-200">
                  {article.frontmatter.title}
                </p>
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNewArticle2;
