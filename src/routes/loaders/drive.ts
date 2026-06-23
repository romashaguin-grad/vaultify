/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { redirect } from 'react-router';

/**
 * Custom modules
 */
import { account } from '@/lib/appwrite';
import { createFolder } from '@/routes/actions/driveActions';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';

export const driveLoader: LoaderFunction = async () => {
  try {
    const currentSession = await account.getSession({ sessionId: 'current' });
    const user = await account.get();

    const folderName = user.$id;
    await createFolder({ folderName, parentFolderPath: '/' });

    return { currentSession, user };
  } catch (err) {
    if (err instanceof AppwriteException) {
      return redirect('/auth/login');
    }

    throw err;
  }
};
