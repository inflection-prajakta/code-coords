<script>
  let title = "";
  let content = "";
  let subtitle = "";
  let contextMenuVisible = false;
  let contextMenuX = 0;
  let contextMenuY = 0;
  // console.log(content);

  async function handleSubmit() {
    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, subtitle }),
      });
      window.location.replace("/blogs");
    } catch (error) {
      alert("Oops. We failed.");
    }
  }

  const applyFormatting = (command, value = null) => {
    console.log(`Command: ${command}, Value: ${value}`);
    if (typeof document !== 'undefined') {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (command === "insertText" && value === "*") {
                const italicElement = document.createElement("em");
                italicElement.textContent = selection.toString();
                range.deleteContents();
                range.insertNode(italicElement);
            } else if (command === "insertText" && value === "``") {
                const span = document.createElement("code");
                span.textContent = selection.toString();
                range.deleteContents();
                range.insertNode(span);
            } else if (command === "blockquote") {
              const blockquoteElement = document.createElement("blockquote");
              blockquoteElement.className = "border-l-4 border-gray-500 pl-4 italic text-gray-600"; 
              blockquoteElement.textContent = selection.toString();
              range.deleteContents();
              range.insertNode(blockquoteElement);}
               else {
                // Use execCommand for other commands (like lists)
                if (document.queryCommandSupported(command)) {
                    document.execCommand(command, false, value);
                } else {
                    console.warn(`Command ${command} is not supported.`);
                }
            }
            getTextContent();
        }
    }
};

const getTextContent = () => {
    const editor = document.getElementById("editor");
    content = editor.innerHTML;
    // console.log(content);
};


  const insertLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      applyFormatting("createLink", url);
    }
    hideContextMenu();
  };

  const insertImgLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      const imgTag = `<img src="${url}" style="height:auto; width:auto;" />`;
      applyFormatting("insertHTML", imgTag);
    }
  };




const insertTable = () => {
  const rows = parseInt(prompt("Enter the number of rows"), 10);
  const cols = parseInt(prompt("Enter the number of columns"), 10);
  if (rows && cols) {
    let table = "<table class='min-w-full border border-gray-300 border-collapse'>"; 
    for (let i = 0; i < rows; i++) {
      table += "<tr class='border-b border-gray-300'>"; 
      for (let j = 0; j < cols; j++) {
        table += "<td class='px-4 py-2 text-left'>Cell</td>"; 
      }
      table += "</tr>";
    }
    table += "</table>";
    applyFormatting("insertHTML", table);
  }
};


  const showContextMenu = (event) => {
    event.preventDefault();
    contextMenuX = event.pageX;
    contextMenuY = event.pageY;
    contextMenuVisible = true;
  };

  const hideContextMenu = () => {
    contextMenuVisible = false;
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('click', hideContextMenu);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="form-content">
    <label >
      Title:
      <input type="text" class=" mx-10 border rounded-md border-black" bind:value={title} required />
    </label>

    <label>
      Sub Title:
      <input type="text" class=" mx-1 border rounded-md border-black" bind:value={subtitle} required />
    </label>

    <div class="content-container">
      <label for="">
        Content:

      </label>

      <div class="content-options">
        <div class="toolbar">
            <button type="button" on:click={() => applyFormatting("bold")}><i class="fas fa-bold"></i></button>
            <button type="button" on:click={() => applyFormatting("italic")}><i class="fas fa-italic"></i></button>
            <button type="button" on:click={() => applyFormatting("insertText", "``")}><i class="fas fa-code"></i></button>
            <button type="button" on:click={() => applyFormatting("insertUnorderedList")}><i class="fas fa-list-ul"></i></button>
            <button type="button" on:click={() => applyFormatting("insertOrderedList")}><i class="fas fa-list-ol"></i></button>
             <button type="button" on:click={insertTable}><i class="fas fa-table"></i></button>
            <button type="button" on:click={insertImgLink}><i class="fas fa-image"></i></button>
            <button type="button" on:click={() => applyFormatting("blockquote")}><i class="fas fa-quote-left"></i></button> 

        </div>
        <div
         role="presentation"
          id="editor"
          contenteditable="true"
          on:input={getTextContent}
          on:contextmenu={showContextMenu}
          required
          class="prose prose-sm p-4 border rounded"
        ></div>
      </div>    
    </div>

    <div class="submitBtn">
      <button type="submit" class="submit">Submit</button>
   </div>
  </div>

  {#if contextMenuVisible}
    <div
      class="context-menu"
      style="top: {contextMenuX}px; left: {contextMenuY}px;"
    >


      <button type="button" on:click={insertLink}>Insert Link</button>
    </div>
  {/if}
</form>

<style>

  input {
    padding: 5px;
    width: 200px;
    outline: none;
  }

  form {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .content-container {
    display: flex;
    justify-content: center;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    align-items: start;
 
    padding: 20px;
  }

  label {
    margin: 10px 0;
    font-weight: bold;
    font-size: large;
  }

  .toolbar {
    width: 15%;
    margin-left: 20px;
    display: flex;
  }

  button {
   background-color: transparent;
   border: none;
   margin-right: 5px;
    margin-top: 10px;
    padding: 8px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-bottom: 0px;

  }

  button i {
    font-size: 20px;
  }

  .submitBtn {
   text-align: center;
   width: 45%;
  }
   .submit:hover{
    box-shadow: 2px 2px 5px grey;
   }
  

  .submit{
    text-align: center;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    

  }

  .context-menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }

  .context-menu button {
    margin-bottom: 5px;
  }


</style>
