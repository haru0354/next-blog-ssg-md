import path from "path";
import fs from "fs";
import { getFileContents } from "../getFileContents";
import { convertMarkdownToHtml } from "../convertMarkdownToHtml";

export async function getArticles() {
  const ArticlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const fileNames = fs
    .readdirSync(ArticlesDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));

  const Articles = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContents = await getFileContents(ArticlesDirectory, fileName);

      if (!fileContents) {
        console.error(`記事のデータの取得ができませんでした。: ${fileName}`);
      }

      return {
        slug: fileName,
        frontmatter: fileContents?.frontmatter,
      };
    })
  );

  return Articles;
}

export async function getArticle(params: string) {
  const slug = params;
  const articleDirectory = path.join(process.cwd(), "mdFile", "article");

  const fileContents = await getFileContents(articleDirectory, slug, true);

  if (!fileContents || !fileContents.content) {
    console.error(`記事のデータの取得ができませんでした。: ${slug}`);
    return null;
  }

  const contentHtml = await convertMarkdownToHtml(fileContents.content);

  return {
    frontmatter: fileContents?.frontmatter,
    contentHtml,
  };
}
