import Image from "next/image";
import Link from "next/link";

import { getRecommendArticles } from "@/app/lib/service/menuService";

const SideRecommendArticles = async () => {
  const RecommendArticles = await getRecommendArticles();

  if (!RecommendArticles) {
    return null;
  }

  return (
    <div className="bg-white border-r border-l mb-8 border-gray-200">
      <p className="w-full p-4 bg-gray-800 text-white font-bold">
        おすすめの記事
      </p>
      <Link href={`/${RecommendArticles.frontmatter.slug}`}>
        <Image
          src={`/thumbnail_webp/${RecommendArticles.frontmatter.eyeCatchName}.webp`}
          alt={`${RecommendArticles.frontmatter.eyeCatchAlt}`}
          width={298}
          height={196}
          className="mx-auto md:mt-0 mt-8"
        />
      </Link>
    </div>
  );
};

export default SideRecommendArticles;
