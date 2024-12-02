import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { getFileContents } from "./getFileContents";

export async function getArticles() {
  const ArticlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const fileNames = fs
    .readdirSync(ArticlesDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));

  const Articles = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContents = await getFileContents(ArticlesDirectory, fileName);

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
