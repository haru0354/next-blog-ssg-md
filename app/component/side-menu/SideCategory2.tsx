import Link from "next/link";

import { getCategories } from "@/app/lib/service/categoryService";

const SideCategory2 = async () => {
  const categories = await getCategories();

  if (!categories) {
    return null;
  }

  return (
    <nav className="bg-white border-r border-l border-gray-200">
      <p className="w-full p-4 bg-gray-800 text-white font-bold">カテゴリ</p>
      <ul>
        {categories.map((category) => {
          return (
            <Link href={`/${category?.slug}`} key={category?.slug}>
              <li
                className="p-4 border-b border-gray-200 hover:bg-blue-100"
                key={category?.frontmatter?.categoryName}
              >
                {category?.frontmatter?.categoryName}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideCategory2;
