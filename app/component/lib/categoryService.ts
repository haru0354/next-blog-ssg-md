import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { getFileContents } from "./getFileContents";

export async function getCategories() {
  const categoryDirectory = path.join(process.cwd(), "mdFile", "category");
  const fileNames = fs
    .readdirSync(categoryDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));

  const categories = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContents = await getFileContents(categoryDirectory, fileName);

      return {
        slug: fileName,
        frontmatter: fileContents?.frontmatter,
      };
    })
  );

  return categories;
}

export async function getCategory(params: string) {
  const slug = params;
  const categoriesDirectory = path.join(process.cwd(), "mdFile", "category");
  const fileContents = await getFileContents(categoriesDirectory, slug, true);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(fileContents?.content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: fileContents?.frontmatter,
    contentHtml,
  };
}
