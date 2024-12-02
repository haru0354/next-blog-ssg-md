import path from "path";
import { getFileContents } from "./getFileContents";

export async function getGlobalMenu() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const fileContents = await getFileContents(globalMenuDirectory, "globalMenu");

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

  return {
    frontmatter: fileContents?.frontmatter,
  };
}

export async function getLinks() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const fileContents = await getFileContents(globalMenuDirectory, "link");

  return {
    frontmatter: fileContents?.frontmatter,
  };
}
