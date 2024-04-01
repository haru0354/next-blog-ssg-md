import Link from "next/link";
import { getCategories } from "../lib/CategoryService";

const TopCategory = async () => {
  const categories = await getCategories();

  return (
    <>
      <h2>カテゴリ</h2>
      <ul>
        {categories.map((category) => {
          return (
            <Link href={`/${category.slug}`} key={category.slug}>
              <li key={category.frontmatter.title}>
                {category.frontmatter.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default TopCategory