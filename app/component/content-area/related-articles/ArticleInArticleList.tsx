import Link from "next/link";
import Image from "next/image";
import { getArticles } from "../../lib/service/articleService";
import { shuffleArray } from "../../util/shuffleArray";

type ArticleInArticleListProps = {
  categoryName: string;
  articleSlug: string;
  column?: boolean;
};

const ArticleInArticleList: React.FC<ArticleInArticleListProps> = async ({
  categoryName,
  articleSlug,
  column = true,
}) => {
  const articles = await getArticles();

  if (!articles) {
    return null;
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.frontmatter.categoryName === categoryName &&
      article.slug !== articleSlug
  );

  const shuffledArticles = shuffleArray(filteredArticles ?? [])?.slice(0, 4);

  if (!shuffledArticles || shuffledArticles.length === 0) {
    return null;
  }

  return (
    <>
      {column ? (
        <div className="p-4 rounded bg-white">
          <h2 className="w-full my-4 py-4 px-2 bg-gray-800 text-white text-xl font-semibold rounded">
            関連記事
          </h2>
          <div className="w-full flex flex-wrap justify-center">
            {shuffledArticles.map((article) => (
              <Link
                href={`/${article.frontmatter.categorySlug}/${article.slug}`}
                key={article.slug}
              >
                <div className="flex flex-wrap justify-center md:flex-nowrap w-full my-2 py-4 md:p-0 hover: transition-colors duration-300 hover:bg-layout-hoverColor">
                  <div className="min-w-[342px] mb-2 md:mb-0">
                    <Image
                      src={
                        article.frontmatter.eyeCatchName
                          ? `/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`
                          : "/thumbnail_webp/no_image.webp"
                      }
                      alt={
                        article.frontmatter.eyeCatchAlt
                          ? `${article.frontmatter.eyeCatchAlt}`
                          : "アイチャッチ画像"
                      }
                      width={367}
                      height={210}
                    />
                  </div>
                  <div className="flex flex-col w-full md:min-w-[422px] py-2 px-4">
                    <h3 className="mb-6 font-semibold">
                      {article.frontmatter.title.length > 32
                        ? `${article.frontmatter.title.slice(0, 32)}...`
                        : article.frontmatter.title}
                    </h3>
                    <p>
                      {article.frontmatter.description.length > 110
                        ? `${article.frontmatter.description.slice(0, 110)}...`
                        : article.frontmatter.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded bg-white">
          <h2 className="w-full my-4 py-4 px-2 bg-gray-800 text-white text-xl font-semibold rounded">
            関連記事
          </h2>
          <div className="w-full flex flex-wrap justify-start">
            {shuffledArticles.map((article) => (
              <Link
                href={`/${article.frontmatter.categorySlug}/${article.slug}`}
                key={article.slug}
              >
                <div className="flex flex-col max-w-[367px] md:min-h-[330px] mx-2 my-4 hover: transition-colors duration-300 hover:bg-layout-hoverColor">
                  <Image
                    src={
                      article.frontmatter.eyeCatchName
                        ? `/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`
                        : "/thumbnail_webp/no_image.webp"
                    }
                    alt={
                      article.frontmatter.eyeCatchAlt
                        ? `${article.frontmatter.eyeCatchAlt}`
                        : "アイチャッチ画像"
                    }
                    width={367}
                    height={210}
                  />
                  <h3 className="my-4">
                    {article.frontmatter.title.length > 32
                      ? `${article.frontmatter.title.slice(0, 32)}...`
                      : article.frontmatter.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleInArticleList;
