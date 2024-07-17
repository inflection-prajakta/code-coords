<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let selectedImage = null;
    let imageUrl = '';
  console.log(imageUrl);
    function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        selectedImage = file;
        imageUrl = URL.createObjectURL(file);
        dispatch('imageSelected', { file, imageUrl });
      }
    }
  
    function changeImage() {
      document.getElementById('coverImageInput').click();
    }
  
    function removeImage() {
      selectedImage = null;
      imageUrl = '';
      dispatch('imageRemoved');
    }
  </script>
  
  <div class="space-y-4">
    <div class="relative w-full h-64 bg-gray-200">
      {#if imageUrl}
        <img src={imageUrl} alt="Cover Image" class="object-cover w-full h-full"/>
      {:else}
        <p class="flex items-center justify-center h-full text-gray-500">No cover image selected</p>
      {/if}
    </div>
    <input type="file" id="coverImageInput" accept="image/*" class="hidden" on:change={handleFileChange} />
    <div class="flex space-x-4">
      <button type="button" class="px-4 py-2 text-white bg-blue-500 rounded" on:click={changeImage}>
        {#if imageUrl} Change Image {:else} Add Image {/if}
      </button>
      {#if imageUrl}
        <button type="button" class="px-4 py-2 text-white bg-red-500 rounded" on:click={removeImage}>
          Remove Image
        </button>
      {/if}
    </div>
  </div>
  