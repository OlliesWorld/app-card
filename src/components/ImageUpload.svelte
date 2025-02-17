<!-- <script lang="ts">
	export let imageUrl = '';
	let uploading = false;
	let fileInput: HTMLInputElement;

	async function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		try {
			uploading = true;
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

			const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

			const response = await fetch(uploadUrl, {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
			}

			const data = await response.json();
			console.log('Cloudinary URL received:', data.secure_url);

			if (data.secure_url) {
				// Update local state
				imageUrl = data.secure_url;

				// Dispatch event with the secure_url
				const customEvent = new CustomEvent('imageUploaded', {
					detail: data.secure_url, // This becomes event.detail in the Form component
					bubbles: true
				});

				console.log('Dispatching event with URL:', data.secure_url);
				fileInput.dispatchEvent(customEvent);
			}
		} catch (error) {
			console.error('Upload failed:', error);
		} finally {
			uploading = false;
		}
	}

	function triggerFileInput() {
		fileInput?.click();
	}
</script>

<div class="space-y-4">
	<div class="flex items-center space-x-4">
		<button
			type="button"
			on:click={triggerFileInput}
			class="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			disabled={uploading}
		>
			{uploading ? 'Uploading...' : 'Upload Image'}
		</button>
		<input
			type="file"
			bind:this={fileInput}
			on:change={handleFileChange}
			accept="image/*"
			class="hidden"
		/>
	</div>
	{#if imageUrl}
		<div class="relative h-40 w-40">
			<img src={imageUrl} alt="Uploaded preview" class="h-full w-full rounded-md object-cover" />
		</div>
	{/if}
</div> -->
