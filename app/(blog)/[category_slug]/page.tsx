import { getCategories, getCategory } from "@/app/component/lib/blogService";

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
    <div>
      <p>{category.frontmatter.title}</p>
      <p>{category.frontmatter.date}</p>
    </div>
  );
};

export default page;
