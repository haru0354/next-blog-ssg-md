import path from "path";

import { getFileContents } from "../getFileContents";

export async function getGlobalMenu() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");

  try {
    const fileContents = await getFileContents(
      globalMenuDirectory,
      "globalMenu"
    );

    if (!fileContents) {
      console.error("グローバルメニューのデータの取得ができませんでした。");
      return null;
    }

    return {
      frontmatter: fileContents?.frontmatter,
    };
  } catch (error) {
    console.error(
      "グローバルメニューのデータ取得中にエラーが発生しました。",
      error
    );
    return null;
  }
}

export async function getRecommendArticles() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");

  try {
    const fileContents = await getFileContents(
      globalMenuDirectory,
      "recommendArticle"
    );

    if (!fileContents) {
      console.error("おすすめの記事のデータの取得ができませんでした。");
      return null;
    }

    return {
      frontmatter: fileContents?.frontmatter,
    };
  } catch (error) {
    console.error(
      "おすすめの記事のデータ取得中にエラーが発生しました。",
      error
    );
    return null;
  }
}

export async function getLinks() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");

  try {
    const fileContents = await getFileContents(globalMenuDirectory, "link");

    if (!fileContents) {
      console.error("サイドバーのリンクのデータの取得ができませんでした。");
      return null;
    }

    return {
      frontmatter: fileContents?.frontmatter,
    };
  } catch (error) {
    console.error(
      "サイドバーのリンクのデータの取得中にエラーが発生しました。",
      error
    );
    return null;
  }
}
