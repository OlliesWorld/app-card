<!-- +page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Client, Databases } from 'appwrite';
	import ProjectForm from '../../components/Form.svelte';

	let currentFormData = {
		name: '',
		description: '',
		link1: '',
		link2: ''
	};

	const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
	const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(projectId);

	const databases = new Databases(client);
	const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
	const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

	onMount(() => {
		// Changed to use the new event name
		document.addEventListener('formsubmit', handleSubmit);
		document.addEventListener('forminput', handleFormInput);

		return () => {
			document.removeEventListener('formsubmit', handleSubmit);
			document.removeEventListener('forminput', handleFormInput);
		};
	});

	async function handleSubmit(event: Event) {
		const customEvent = event as CustomEvent;
		const formData = customEvent.detail;

		// console.log('Received form data:', formData);

		try {
			const appwriteData = {
				name: formData.name,
				description: formData.description,
				link1: formData.link1 || '',
				link2: formData.link2 || '',
				imageUrl: '',
				imageId: ''
			};

			console.log('Data being sent to Appwrite:', appwriteData);

			const response = await databases.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				'unique()',
				appwriteData
			);

			console.log('Project created:', response);

			// Reset form data after successful submission
			currentFormData = {
				name: '',
				description: '',
				link1: '',
				link2: ''
			};
		} catch (error) {
			console.error('Error creating project:', error);
			if (error instanceof Error) {
				console.error('Error details:', error.message);
			}
		}
	}

	function handleFormInput(event: Event) {
		const customEvent = event as CustomEvent;
		// console.log('Form input received:', customEvent.detail);
		currentFormData = customEvent.detail;
	}
</script>

<div class="mx-auto max-w-2xl p-6">
	<h1 class="mb-6 text-2xl font-bold">Add New Project</h1>

	<ProjectForm />

	<!-- <div class="mt-8 rounded-md bg-gray-50 p-4">
		<h2 class="mb-2 text-lg font-semibold">Form Data Preview:</h2>
		<pre class="whitespace-pre-wrap">{JSON.stringify(currentFormData, null, 2)}</pre>
	</div> -->
</div>
