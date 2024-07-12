import { createBlogs, getAllBlogs } from "../../lib/blogs";
import TurndownService from 'turndown';
import { Remarkable } from "remarkable";
const md = new Remarkable();
const turndownService = new TurndownService();

export const get = async () => {
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

function convertToMarkdown(title, subtitle) {
  let markdownTitle = `# ${title}\n\n## ${subtitle}`;
  return markdownTitle;
}

const handleSubmit = async (content) => {
  const markdownContent = turndownService.turndown(content);
  return markdownContent;
};

export const post = async ({ request }) => {
  const newBlog = await request.json();
  const { title, content, subtitle } = newBlog;
  const markdownContent = await handleSubmit(content);
  const markdownTitle = convertToMarkdown(title, subtitle);

  const blog = await createBlogs({ markdownTitle, content: markdownContent });
  return new Response(JSON.stringify(blog), {
    status: 200,
  });
};
