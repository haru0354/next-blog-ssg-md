import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export async function convertMarkdownToHtml(content: string) {
  const contentHtml = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return contentHtml.toString();
}
