import CategoryInArticlesList from "@/app/component/contentArea/CategoryInArticlesList";
import {
  getCategories,
  getCategory,
} from "@/app/component/lib/CategoryService";

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
    <>
      <div>
        <p>{category.frontmatter.title}</p>
        <p>{category.frontmatter.date}</p>
      </div>
      <CategoryInArticlesList params={params.category_slug} />
    </>
  );
};

export default page;
