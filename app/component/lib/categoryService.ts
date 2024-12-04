import path from "path";
import fs from "fs";
import { getFileContents } from "./getFileContents";
import { convertMarkdownToHtml } from "./convertMarkdownToHtml";

export async function getCategories() {
  const categoryDirectory = path.join(process.cwd(), "mdFile", "category");
  const fileNames = fs
    .readdirSync(categoryDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));

  const categories = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContents = await getFileContents(categoryDirectory, fileName);

      if (!fileContents) {
        const errorMessage = `カテゴリのデータの取得ができませんでした。ディレクトリ: ${categoryDirectory}, ファイル名: ${fileName}`;
        console.error(errorMessage);
      }

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

  if (!fileContents || !fileContents.content) {
    throw new Error(`カテゴリのデータの取得ができませんでした。: ${slug}`);
  }

  const contentHtml = await convertMarkdownToHtml(fileContents.content);

  return {
    frontmatter: fileContents?.frontmatter,
    contentHtml,
  };
}
