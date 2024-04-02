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
    <div className="bg-white p-4 mt-8">
      <h2 className="w-full my-4 py-4 px-2  bg-gray-800 text-white font-bold rounded">
        関連記事
      </h2>
      <div className="w-full flex flex-wrap justify-center">
        {filteredArticles.map((article) => (
          <Link
            href={`/${article.frontmatter.category}/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-col max-w-[368px] min-h-[330px] mx-2 my-4">
              <Image
                src={`/${article.frontmatter.eyeCatchName}`}
                alt={`${article.frontmatter.eyeCatchAlt}`}
                width={368}
                height={210}
              />
              <h3 className="my-4">{article.frontmatter.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryInArticlesList;
