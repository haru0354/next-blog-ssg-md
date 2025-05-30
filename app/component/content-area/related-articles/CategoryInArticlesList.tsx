import { getArticles } from "../../lib/service/articleService";
import { shuffleArray } from "@/app/utils/shuffleArray";
import LoadMoreArticles from "./LoadMoreArticles";

type CategoryInArticlesListProps = {
  categoryName: string;
  categoryContents: boolean;
};

const CategoryInArticlesList: React.FC<CategoryInArticlesListProps> = async ({
  categoryName,
  categoryContents = false,
}) => {
  const articles = await getArticles();

  if (!articles) {
    return null;
  }

  const filteredArticles = articles.filter(
    (article) => article.frontmatter.categoryName === categoryName
  );

  const shuffledArticles = shuffleArray(filteredArticles);

  return (
    <div className="p-4 rounded bg-white">
      {categoryContents ? (
        <h2 className="w-full my-4 py-4 px-2 bg-gray-800 text-white text-xl font-semibold rounded">
          「{categoryName}」の記事一覧
        </h2>
      ) : (
        <h1 className="text-2xl font-semibold mx-2 mb-8">
          「{categoryName}」の記事一覧
        </h1>
      )}
      <LoadMoreArticles articles={shuffledArticles} column={false} />
    </div>
  );
};

export default CategoryInArticlesList;
