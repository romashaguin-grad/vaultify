/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { redirect } from 'react-router';
import { getCurrentUserFolder, functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';
import type { LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';

const FN_ID = import.meta.env.VITE_APPWRITE_FN_ID;

const getFiles = async (folderName: string, isRecent?: boolean) => {
  const response = await functions.createExecution(
    FN_ID,
    JSON.stringify({
      path: folderName,
      sort: isRecent ? 'DESC_CREATED' : 'ASC_CREATED',
    }),
    false,
    '/files',
    ExecutionMethod.POST,
  );
  const data = JSON.parse(response.responseBody);
  return data.data ?? [];
};

const getFolders = async (folderName: string) => {
  const response = await functions.createExecution(
    FN_ID,
    JSON.stringify({
      path: folderName,
      type: 'folder',
    }),
    false,
    '/files',
    ExecutionMethod.POST,
  );
  const data = JSON.parse(response.responseBody);
  return data.data ?? [];
};

export const driveFileLoader: LoaderFunction = async () => {
  try {
    const folderName = await getCurrentUserFolder();

    const [files, recentFiles, folders] = await Promise.all([
      getFiles(folderName!),
      getFiles(folderName!, true),
      getFolders(folderName!),
    ]);

    return { files, recentFiles, folders };
  } catch (err) {
    if (err instanceof AppwriteException) {
      return redirect('/auth/login');
    }
    throw err;
  }
};