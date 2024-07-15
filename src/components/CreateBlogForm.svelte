<script>
  let title = "";
  let content = "";
  let subtitle = "";
  let contextMenuVisible = false;
  let contextMenuX = 0;
  let contextMenuY = 0;

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
    if (typeof document !== "undefined") {
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
          blockquoteElement.textContent = selection.toString();
          range.deleteContents();
          range.insertNode(blockquoteElement);
        } else {
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
      let table =
        "<table class='min-w-full border border-gray-300 border-collapse'>";
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

  if (typeof document !== "undefined") {
    document.addEventListener("click", hideContextMenu);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="max-w-4xl mx-auto mt-8">
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-black text-lg font-semibold mb-2">
        Title
        <input
          type="text"
          class="form-input mt-1 block w-full rounded-md border-gray-300"
          bind:value={title}
          required
        />
      </label>
    </div>

    <div class="mb-4">
      <label class="block text-black text-lg font-semibold mb-2">
        Sub Title
        <input
          type="text"
          class="form-input mt-1 block w-full rounded-md border-gray-300"
          bind:value={subtitle}
          required
        />
      </label>
    </div>

    <div class="mb-4">
      <label class="block text-black text-lg font-semibold mb-2">
        Content
      </label>
      <div class="border border-gray-300 rounded">
        <div class="flex justify-end p-2">
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={() => applyFormatting("bold")}
          >
            <i class="fas fa-bold"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={() => applyFormatting("italic")}
          >
            <i class="fas fa-italic"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={() => applyFormatting("insertText", "``")}
          >
            <i class="fas fa-code"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={() => applyFormatting("insertUnorderedList")}
          >
            <i class="fas fa-list-ul"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={() => applyFormatting("insertOrderedList")}
          >
            <i class="fas fa-list-ol"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={insertTable}
          >
            <i class="fas fa-table"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={insertImgLink}
          >
            <i class="fas fa-image"></i>
          </button>
          <button
            type="button"
            class="text-gray-600 p-2 rounded-lg border mx-1 hover:bg-gray-200 focus:outline-none"
            on:click={() => applyFormatting("blockquote")}
            ><i class="fas fa-quote-left"></i></button
          >
        </div>
        <div
        role="presentation"
          id="editor"
          contenteditable="true"
          on:input={getTextContent}
          on:contextmenu={showContextMenu}
          class="p-4 outline-none prose"
          style="min-height: 200px;"
          required
        ></div>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Submit</button
      >
    </div>
  </div>

  {#if contextMenuVisible}
    <div
      class="fixed bg-white shadow-md rounded p-2"
      style="top: {contextMenuY}px; left: {contextMenuX}px;"
    >
      <button
        type="button"
        class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        on:click={insertLink}>Insert Link</button
      >
    </div>
  {/if}
</form>
