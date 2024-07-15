import { createBlogs, getAllBlogs } from "../../lib/blogs";
import TurndownService from 'turndown';
import { compile } from "mdsvex";
import { Remarkable } from "remarkable";
const md = new Remarkable();
const turndownService = new TurndownService();

turndownService.addRule('table', {
  filter: 'table',
  replacement: (content, node) => {
    const rows = Array.from(node.querySelectorAll('tr'));
    const markdownRows = rows.map(row => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      return '| ' + cells.map(cell => cell.textContent.trim()).join(' | ') + ' |';
    });

    // Add separator for headers
    if (rows.length > 1) {
      const headerCount = rows[0].querySelectorAll('th').length || rows[0].querySelectorAll('td').length;
      const headerSeparator = '| ' + new Array(headerCount).fill('---').join(' | ') + ' |';
      markdownRows.splice(1, 0, headerSeparator);
    }

    return markdownRows.join('\n');
  }
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


// function convertToMarkdown(title, content){
//   let markdownTitle = md.render(title);
//   let markdownContent = md.render(content);
//   return markdownTitle, markdownContent
// }


function convertToMarkdown(title, subtitle){
  let markdownTitle = `# ${title}\n\n## ${subtitle}`;
  return markdownTitle;
}


const handleSubmit = async (content) => {
  const markdownContent = turndownService.turndown(content)
  console.log("markdownContent:" ,markdownContent);

    return markdownContent;

};

export const POST = async ({ request }) => {
  const newBlog = await request.json();
  const {title, content, subtitle} = newBlog
  // console.log(content);

  const markdownContent = await handleSubmit(content);
  const markdownTitle = convertToMarkdown(title,subtitle) 
 
  const blog = await createBlogs({markdownTitle,content:markdownContent});
  return new Response(JSON.stringify(blog), {
    status: 200,
  });
};

