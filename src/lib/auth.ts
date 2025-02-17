// import { account, ID } from '$lib/appwrite';
// import { goto } from '$app/navigation';
// import type { Models } from 'appwrite';

// export let loggedInUser: Models.User<Models.Preferences> | null = null;

// export async function login(email: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<void> {
//     try {
//         loggedInUser = await account.get();
//     } catch (error) {
//         if (email && password) {
//             await account.createEmailPasswordSession(email.toString(), password.toString());
//         }
//         loggedInUser = await account.get();
//     }
// }

// export async function register(email: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<void> {
//     if (email && password) {
//         await account.create(ID.unique(), email.toString(), password.toString());
//         await login(email, password);
//     } else {
//         throw new Error('Email and password must not be null');
//     }
// }

// export async function logout(): Promise<void> {
//     await account.deleteSession('current');
//     loggedInUser = null;
//     goto('/');
// }