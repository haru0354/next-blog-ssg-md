import path from "path";
import { getFileContents } from "../getFileContents";

export async function getGlobalMenu() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const fileContents = await getFileContents(globalMenuDirectory, "globalMenu");

  if (!fileContents) {
    console.error(
      `グローバルメニューのデータの取得ができませんでした。: ディレクトリ: ${globalMenuDirectory}, ファイル名: globalMenu.md`
    );
    return null;
  }

  return {
    frontmatter: fileContents?.frontmatter,
  };
}

export async function getRecommendArticles() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const fileContents = await getFileContents(
    globalMenuDirectory,
    "recommendArticle"
  );

  if (!fileContents) {
    console.error(
      `おすすめの記事のデータの取得ができませんでした。: ディレクトリ: ${globalMenuDirectory}, ファイル名: recommendArticle.md`
    );
    return null;
  }

  return {
    frontmatter: fileContents?.frontmatter,
  };
}

export async function getLinks() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const fileContents = await getFileContents(globalMenuDirectory, "link");

  if (!fileContents) {
    console.error(
      `サイドバーのリンクのデータの取得ができませんでした。: ディレクトリ: ${globalMenuDirectory}, ファイル名: link.md`
    );
    return null;
  }

  return {
    frontmatter: fileContents?.frontmatter,
  };
}
