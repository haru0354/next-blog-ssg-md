import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const TopNewArticle = async () => {
  const articles = await getArticles();
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 6);

  return (
    <div>
      <h2>新着記事</h2>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={`/${article.frontmatter.category}/${article.slug}`}
              key={article.slug}
            >
              <div>
                <Image
                  src={`/${article.frontmatter.eyeCatchName}`}
                  alt={`${article.frontmatter.eyeCatchAlt}`}
                  width={100}
                  height={100}
                />
                <h3>{article.frontmatter.title}</h3>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default TopNewArticle;
