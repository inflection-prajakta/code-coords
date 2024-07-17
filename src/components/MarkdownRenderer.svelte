<script>
  import { marked } from 'marked';


  export let content = '';
  let htmlTitle = '';
  let htmlContent = '';
  let coverImage = '';
  // console.log(content);
  coverImage = marked(content.image)
  // console.log(coverImage);
    htmlTitle = marked(content.title)
    htmlContent = marked(content.content);
</script>
<div
  class="markdown prose prose-sm my-8 mx-auto bg-zinc-200 p-6 rounded-xl sm:w-3/4 lg:w-2/3 xl:w-1/2"
>
  {@html coverImage}
  {@html htmlTitle}
  {@html htmlContent}
</div>
