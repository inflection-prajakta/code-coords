<script>
  import { onMount } from "svelte";
  import { marked } from "marked";

  export let content = "";
  //  console.log(content.content);
  let htmlTitle = "";
  let htmlContent = "";
  htmlTitle = marked(content.markdownTitle);
  htmlContent = marked(content.content);
  // console.log('HTML content:', htmlContent);
</script>

<div
  class="markdown prose prose-sm my-8 mx-auto bg-zinc-200 p-6 rounded-xl sm:w-3/4 lg:w-2/3 xl:w-1/2"
>
  {@html htmlTitle}
  {@html htmlContent}
</div>
