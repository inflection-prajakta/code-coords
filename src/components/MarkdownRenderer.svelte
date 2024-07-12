<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import {Remarkable} from 'remarkable'

  const md = new Remarkable()

  export let content = '';

  let htmlTitle = '';
  let htmlContent = '';
    htmlTitle = marked(content.markdownTitle)
    htmlContent = md.render(content.content);
    // console.log('HTML content:', htmlContent);  
</script>

<div class="markdown" >
  {@html htmlTitle}

  {@html htmlContent}

</div>

<style>
  .markdown {
    font-family: Arial, sans-serif;
    list-style-type: none;
    background-color: rgb(210, 210, 210);
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    width: 70%;
  }

</style>
