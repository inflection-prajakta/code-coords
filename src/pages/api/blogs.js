// src/routes/api/blogs.js
import { createBlogs, getAllBlogs } from "../../lib/blogs";
import TurndownService from "turndown";
import { Remarkable } from "remarkable";
const md = new Remarkable();
const turndownService = new TurndownService();

// Define custom rule for tables if needed
turndownService.addRule("table", {
  filter: "table",
  replacement: (content, node) => {
    const rows = Array.from(node.querySelectorAll("tr"));
    const markdownRows = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return (
        "| " + cells.map((cell) => cell.textContent.trim()).join(" | ") + " |"
      );
    });

    if (rows.length > 1) {
      const headerCount =
        rows[0].querySelectorAll("th").length ||
        rows[0].querySelectorAll("td").length;
      const headerSeparator =
        "| " + new Array(headerCount).fill("---").join(" | ") + " |";
      markdownRows.splice(1, 0, headerSeparator);
    }

    return markdownRows.join("\n");
  },
});

export const GET = async () => {
  const blogs = await getAllBlogs();
  if (!blogs) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(blogs), {
    status: 200,
  });
};

export const POST = async ({ request }) => {
  const newBlog = await request.json();
  const { title, content, subtitle, coverImage } = newBlog;

  // Convert content to Markdown using turndown
  const markdownContent = turndownService.turndown(content);

  // Create a Markdown title with cover image
  let markdownTitle = `# ${title}\n\n## ${subtitle}`;
  let coverImageMarkdown = `![Cover Image](${coverImage})`;

  const blog = await createBlogs({image:coverImageMarkdown, title: markdownTitle, content: markdownContent });

  return new Response(JSON.stringify(blog), {
    status: 200,
  });
};
