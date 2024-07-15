<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';


  export let content = '';
  let htmlTitle = '';
  let htmlContent = '';

    htmlTitle = marked(content.markdownTitle)
    htmlContent = marked(content.content);
    // console.log('HTML content:', htmlContent);  
</script>

<div class="markdown prose prose-sm mx-auto my-3 p-4 bg-gray-200 rounded-lg w-1/2" >
  {@html htmlTitle}

  {@html htmlContent}

</div>

<!-- <style>
  .markdown {
    font-family: Arial, sans-serif;
    list-style-type: none;
    background-color: rgb(210, 210, 210);
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    width: 70%;
  }

</style> -->
