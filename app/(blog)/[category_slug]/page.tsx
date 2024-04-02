import SideMenu from "@/app/component/SideMenu";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
import CategoryInArticlesList from "@/app/component/contentArea/CategoryInArticlesList";
import {
  getCategories,
  getCategory,
} from "@/app/component/lib/CategoryService";
import parse from "html-react-parser";
import Image from "next/image";

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    params: {
      category_slug: category.slug,
    },
  }));
}

const page = async ({ params }: { params: { category_slug: string } }) => {
  const category = await getCategory(params.category_slug);

  return (
    <main className="flex justify-center">
      <div className="max-w-[1150px] flex flex-wrap justify-center my-10">
        <div className="flex flex-col flex-wrap w-full md:w-[800px] md:mr-6">
          <div className="content p-4 bg-white">
            <Breadcrumbs
              categorySlug={params.category_slug}
              categoryName={category.frontmatter.categoryName}
              isCategory={true}
            />
            <h1 className="text-2xl font-semibold mx-2 my-4">
              {category.frontmatter.title}
            </h1>
            <Image
              src={`/${category.frontmatter.eyeCatchName}`}
              alt={`${category.frontmatter.eyeCatchAlt}`}
              width={750}
              height={493}
              className="mx-auto"
            />
            <p className="my-2 mx-2 mb-6 text-gray-600">
              投稿日：{category.frontmatter.date}
            </p>
            {parse(category.contentHtml)}
          </div>
          <CategoryInArticlesList params={params.category_slug} />
        </div>

        <div className="flex flex-col w-full md:w-[300px] mt-4 md:mt-0 bg-white">
          <SideMenu />
        </div>
      </div>
    </main>
  );
};

export default page;
