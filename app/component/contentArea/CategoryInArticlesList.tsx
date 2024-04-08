import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const CategoryInArticlesList = async ({ params }: { params: string }) => {
  const currentCategory = params;
  const Articles = await getArticles();
  const filteredArticles = Articles.filter(
    (article) => currentCategory === article.frontmatter.category
  );

  return (
    <>
      <h3>関連記事</h3>
      <div className="w-full flex flex-wrap justify-center">
        {filteredArticles.map((article) => (
          <Link
            href={`/${article.frontmatter.category}/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-col max-w-[350px] min-h-[330px] mr-4 my-4">
              <Image
                src={`/${article.frontmatter.eyeCatchName}`}
                alt={`${article.frontmatter.eyeCatchAlt}`}
                width={350}
                height={210}
              />
              <h3 className="my-4">{article.frontmatter.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryInArticlesList;
