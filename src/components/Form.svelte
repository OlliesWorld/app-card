<script lang="ts">
	export let initialData = {
		name: '',
		description: '',
		link1: '',
		link2: ''
	};

	let formData = { ...initialData };

	function handleInput() {
		// console.log('Input changed:', formData);
		const event = new CustomEvent('forminput', {
			bubbles: true,
			composed: true,
			detail: { ...formData } // Create a new object
		});
		document.dispatchEvent(event);
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		// console.log('Form submitted with data:', formData);

		// Explicitly construct the data object
		const submitData = {
			name: formData.name,
			description: formData.description,
			link1: formData.link1,
			link2: formData.link2
		};

		const event = new CustomEvent('formsubmit', {
			// Changed event name to be more specific
			bubbles: true,
			composed: true,
			detail: submitData
		});
		document.dispatchEvent(event);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div>
		<label for="name" class="block text-sm font-medium">Project Name</label>
		<input
			type="text"
			id="name"
			bind:value={formData.name}
			on:input={handleInput}
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		/>
	</div>

	<div>
		<label for="description" class="block text-sm font-medium">Description</label>
		<textarea
			id="description"
			bind:value={formData.description}
			on:input={handleInput}
			required
			rows="3"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		></textarea>
	</div>

	<div>
		<label for="primaryLink" class="block text-sm font-medium">Primary Link</label>
		<input
			type="url"
			id="primaryLink"
			bind:value={formData.link1}
			on:input={handleInput}
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		/>
	</div>

	<div>
		<label for="secondaryLink" class="block text-sm font-medium">Secondary Link</label>
		<input
			type="url"
			id="secondaryLink"
			bind:value={formData.link2}
			on:input={handleInput}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		/>
	</div>

	<button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
		Submit Project
	</button>
</form>
