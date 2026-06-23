/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Client, Account, Databases, Functions } from 'appwrite';

const APPWRITE_ENDPOINT =
  import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID =
  import.meta.env.VITE_APPWRITE_PROJECT_ID || 'missing-project-id';

if (!import.meta.env.VITE_APPWRITE_ENDPOINT || !import.meta.env.VITE_APPWRITE_PROJECT_ID) {
  console.warn(
    'Missing Appwrite environment variables. Copy .env.example to .env and set VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID.',
  );
}

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export const getCurrentUserFolder = async () => {
  try {
    const user = await account.get();
    const folderName = user.$id;
    return folderName;
  } catch {
    return null;
  }
};

export { ID, Query, Permission, Role, OAuthProvider } from 'appwrite';
