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

<form on:submit|preventDefault={handleSubmit} class="form-container">
    <div>
        <label for="name" class="form-label">Project Name</label>
        <input
            type="text"
            id="name"
            bind:value={formData.name}
            on:input={handleInput}
            required
            class="form-input"
        />
    </div>

    <div>
        <label for="description" class="form-label">Description</label>
        <textarea
            id="description"
            bind:value={formData.description}
            on:input={handleInput}
            required
            rows="3"
            class="form-input"
        ></textarea>
    </div>

    <div>
        <label for="primaryLink" class="form-label">Primary Link</label>
        <input
            type="url"
            id="primaryLink"
            bind:value={formData.link1}
            on:input={handleInput}
            required
            class="form-input"
        />
    </div>
    <div>
        <label for="secondaryLink" class="form-label">Secondary Link</label>
        <input
            type="url"
            id="secondaryLink"
            bind:value={formData.link2}
            on:input={handleInput}
            class="form-input"
        />
    </div>

    <button type="submit" class="submit-button">
        Submit Project
    </button>
</form>
<style>
    /* Form container with spacing between elements */
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /* Label styles */
    .form-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
    }

    /* Input and textarea styles */
    .form-input {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .form-input:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }

    /* Submit button styles */
    .submit-button {
        background-color: #2563eb;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
    }
	.submit-button:hover {
        background-color: #1d4ed8;
    }

    /* Add some spacing between form elements */
    .form-container > div {
        margin-bottom: 1rem;
    }

    /* Textarea specific styles */
    textarea.form-input {
        min-height: 6rem;
        resize: vertical;
    }
</style>