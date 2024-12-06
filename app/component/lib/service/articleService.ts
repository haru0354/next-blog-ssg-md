import path from "path";
import fs from "fs";
import { getFileContents } from "../getFileContents";
import { convertMarkdownToHtml } from "../convertMarkdownToHtml";

export async function getArticles() {
  const articlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));

  const articles = (
    await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const fileContents = await getFileContents(
            articlesDirectory,
            fileName
          );

          if (!fileContents) {
            console.error(`記事のデータが取得できませんでした: ${fileName}`);
            return null;
          }

          return {
            slug: fileName,
            frontmatter: {
              title: fileContents.frontmatter.title,
              date: fileContents.frontmatter.date,
              description: fileContents.frontmatter.description,
              categoryName: fileContents.frontmatter.categoryName,
              categorySlug: fileContents.frontmatter.categorySlug,
              eyeCatchName:fileContents.frontmatter.eyeCatchName,
              eyeCatchAlt: fileContents.frontmatter.eyeCatchAlt,
            },
          };
        } catch (error) {
          console.error(
            `記事の取得中にエラーが発生しました: ${fileName}`,
            error
          );
          return null;
        }
      })
    )
  ).filter((article) => article !== null);

  return articles;
}

export async function getArticle(params: string) {
  const slug = params;
  const articleDirectory = path.join(process.cwd(), "mdFile", "article");

  try {
    const fileContents = await getFileContents(articleDirectory, slug, true);

    if (!fileContents || !fileContents.content) {
      console.error(`記事のデータの取得ができませんでした。: ${slug}`);
      return null;
    }

    const contentHtml = await convertMarkdownToHtml(fileContents.content);

    if (!contentHtml) {
      console.error(`コンテンツをhtmlに変換できませんでした。: ${slug}`);
      return null;
    }

    return {
      contentHtml,
      frontmatter: {
        title: fileContents.frontmatter.title,
        date: fileContents.frontmatter.date,
        description: fileContents.frontmatter.description,
        categoryName: fileContents.frontmatter.categoryName,
        categorySlug: fileContents.frontmatter.categorySlug,
        eyeCatchName:fileContents.frontmatter.eyeCatchName,
        eyeCatchAlt: fileContents.frontmatter.eyeCatchAlt,
      },
    };
  } catch (error) {
    console.error(`個別記事の取得中にエラーが発生しました: ${slug}`, error);
    return null;
  }
}
