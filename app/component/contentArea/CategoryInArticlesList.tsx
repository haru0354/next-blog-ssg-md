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
        <div>
          {filteredArticles.map((article) => (
            <Link
              href={`/${article.frontmatter.category}/${article.slug}`}
              key={article.slug}
            >
              <div className="border border-gray-500">
                <Image 
                  src={`/${article.frontmatter.eyeCatchName}`}
                  alt={`${article.frontmatter.eyeCatchAlt}`}
                  width={100}
                  height={100}
                />
              </div>
            </Link>
          ))}
        </div>
      );
    }

export default CategoryInArticlesList