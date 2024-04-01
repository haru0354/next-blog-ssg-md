import Link from "next/link";
import { getCategories } from "../lib/CategoryService";
import Image from "next/image";

const TopCategory = async () => {
  const categories = await getCategories();

  return (
    <>
      <h2>カテゴリ</h2>
      {categories.map((category) => {
        return (
          <Link href={`/${category.slug}`} key={category.slug}>
            <div>
              <Image
                src={`/${category.frontmatter.eyeCatchName}`}
                alt={`${category.frontmatter.eyeCatchAlt}`}
                width={100}
                height={100}
              />
              <h3>{category.frontmatter.title}</h3>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default TopCategory;
