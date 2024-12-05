import path from "path";
import fs from "fs";
import { getFileContents } from "../getFileContents";
import { convertMarkdownToHtml } from "../convertMarkdownToHtml";

export async function getCategories() {
  const categoryDirectory = path.join(process.cwd(), "mdFile", "category");
  const fileNames = fs
    .readdirSync(categoryDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));

  const categories = await Promise.all(
    fileNames.map(async (fileName) => {
      try {
        const fileContents = await getFileContents(categoryDirectory, fileName);

        if (!fileContents) {
          const errorMessage = `カテゴリのデータの取得ができませんでした。: ファイル名: ${fileName}`;
          console.error(errorMessage);
          return null;
        }

        return {
          slug: fileName,
          frontmatter: fileContents?.frontmatter,
        };
      } catch (error) {
        console.error(`カテゴリの取得中にエラーが発生しました: ${fileName}`, error);
        return null;
      }
    })
  );

  return categories;
}

export async function getCategory(params: string) {
  const slug = params;
  const categoriesDirectory = path.join(process.cwd(), "mdFile", "category");

  try {
    const fileContents = await getFileContents(categoriesDirectory, slug, true);

    if (!fileContents) {
      console.error(`カテゴリのデータの取得ができませんでした。: ${slug}`);
      return null;
    }

    let contentHtml;
    if (fileContents.content) {
      contentHtml = await convertMarkdownToHtml(fileContents.content);
    }

    return {
      frontmatter: fileContents?.frontmatter,
      ...(contentHtml && { contentHtml }),
    };
  } catch (error) {
    console.error(`個別カテゴリの取得中にエラーが発生しました: ${slug}`, error);
    return null;
  }
}
