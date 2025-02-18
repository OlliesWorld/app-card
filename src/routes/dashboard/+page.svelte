<script lang="ts">
	import { onMount } from 'svelte';
	import { Client, Databases, type Models } from 'appwrite';
	import ProjectForm from '../../components/Form.svelte';
	import ProjectCard from '../../components/Card.svelte';
	import { account } from '$lib/appwrite';

	let loggedInUser: Models.User<Models.Preferences> | null = null;

	async function checkUser() {
		try {
			loggedInUser = await account.get();
		} catch (error) {
			loggedInUser = null;
		}
	}

	checkUser();

	function setLoggedInUser(user: any | null) {
		loggedInUser = user;
	}
	let currentFormData = {
		name: '',
		description: '',
		link1: '',
		link2: ''
	};

	let projects: string | any[] = [];
	let loading = true;
	let error: string | null = null;

	const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
	const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(projectId);

	const databases = new Databases(client);
	const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
	const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

	async function fetchProjects() {
		try {
			loading = true;
			const response = await databases.listDocuments(
				DATABASE_ID,
				COLLECTION_ID
				// Add queries here if you need to filter by user ID
				// [Query.equal('userId', 'current-user-id')]
			);
			projects = response.documents;
		} catch (err) {
			console.error('Error fetching projects:', err);
			error = 'Failed to load projects';
		} finally {
			loading = false;
		}
	}

	async function handleSubmit(event: Event) {
		const customEvent = event as CustomEvent;
		const formData = customEvent.detail;

		try {
			const appwriteData = {
				name: formData.name,
				description: formData.description,
				link1: formData.link1 || '',
				link2: formData.link2 || '',
				imageUrl: '',
				imageId: ''
			};

			const response = await databases.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				'unique()',
				appwriteData
			);

			console.log('Project created:', response);

			// Refresh the projects list after creating a new one
			await fetchProjects();

			// Reset form data
			currentFormData = {
				name: '',
				description: '',
				link1: '',
				link2: ''
			};
		} catch (error) {
			console.error('Error creating project:', error);
		}
	}

	onMount(() => {
		fetchProjects();
		document.addEventListener('formsubmit', handleSubmit);
		document.addEventListener('forminput', handleFormInput);

		return () => {
			document.removeEventListener('formsubmit', handleSubmit);
			document.removeEventListener('forminput', handleFormInput);
		};
	});

	function handleFormInput(event: Event) {
		const customEvent = event as CustomEvent;
		currentFormData = customEvent.detail;
	}
</script>

<div class="container mx-auto p-6">
	<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
		<div class="mb-12 w-2/3">
			<h1 class="mb-6 text-2xl font-bold">Add New Project</h1>
			<ProjectForm />
		</div>

		<div>
			<h2 class="mb-6 text-xl font-semibold">Your Projects</h2>
			{#if loading}
				<div class="py-8 text-center">
					<p>Loading projects...</p>
				</div>
			{:else if error}
				<div class="py-8 text-center text-red-600">
					<p>{error}</p>
				</div>
			{:else if projects.length === 0}
				<div class="py-8 text-center text-gray-600">
					<p>No projects found. Add your first project above!</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each projects as project (project.$id)}
						<ProjectCard {project} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Equivalent styles for the utility classes that were previously from Tailwind */

	/* Container + auto margin + padding */

	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
	.p-6 {
		padding: 1.5rem;
	}

	/* Grid and spacing */
	.grid {
		display: grid;
	}
	.grid-cols-1 {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
	.gap-6 {
		gap: 1.5rem;
	}
	.mb-12 {
		margin-bottom: 3rem;
	}

	/* Responsive breakpoints (replace with your desired breakpoints) */
	@media (min-width: 768px) {
		.md\:grid-cols-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.lg\:grid-cols-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	/* Width utilities */
	.w-2\/3 {
		width: 66.6667%;
	}

	/* Text styles */
	.text-2xl {
		font-size: 1.5rem;
		font-weight: 700;
	}
	.font-bold {
		font-weight: 700;
	}
	.mb-6 {
		margin-bottom: 1.5rem;
	}
	.text-xl {
		font-size: 1.25rem;
		font-weight: 600;
	}
	.font-semibold {
		font-weight: 600;
	}
	.text-center {
		text-align: center;
	}
	.py-8 {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
	.text-red-600 {
		color: #dc2626;
	}
	.text-gray-600 {
		color: #4b5563;
	}
</style>
