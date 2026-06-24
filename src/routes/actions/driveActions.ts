/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { getCurrentUserFolder, functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';
import type { ActionFunction } from 'react-router';

const FN_ID = import.meta.env.VITE_APPWRITE_FN_ID;

interface FolderData {
  folderName: string;
  parentFolderPath?: string;
  currentFolderName?: string | null;
}

interface RenameData {
  filePath?: string;
  newName?: string;
  currentFolderName?: string | null;
}

interface DeleteData {
  fileId: string;
}

export const createFolder = async (data: FolderData) => {
  const response = await functions.createExecution(
    FN_ID,
    JSON.stringify({
      folderName: data.folderName,
      parentFolderPath: `${data?.currentFolderName ?? ''}${data?.parentFolderPath ? `/${data.parentFolderPath}` : '/'}`,
    }),
    false,
    '/folder',
    ExecutionMethod.POST,
  );
  return JSON.parse(response.responseBody);
};

export const renameFile = async (data: RenameData) => {
  const response = await functions.createExecution(
    FN_ID,
    JSON.stringify({
      filePath: data.filePath,
      newName: data.newName,
    }),
    false,
    '/rename',
    ExecutionMethod.POST,
  );
  return JSON.parse(response.responseBody);
};

export const deleteFile = async (data: DeleteData) => {
  const response = await functions.createExecution(
    FN_ID,
    JSON.stringify({ fileId: data.fileId }),
    false,
    '/delete',
    ExecutionMethod.POST,
  );
  return JSON.parse(response.responseBody);
};

export const driveActions: ActionFunction = async ({ request }) => {
  const currentFolderName = await getCurrentUserFolder();

  const data = (await request.json()) as {
    filePath?: string;
    newName?: string;
    folderName?: string;
    parentFolderPath?: string;
    fileId?: string;
  };

  if (request.method === 'POST') {
    return await createFolder({ ...data, currentFolderName } as FolderData);
  }

  if (request.method === 'PUT') {
    return await renameFile({ ...data, currentFolderName });
  }

  if (request.method === 'DELETE') {
    return await deleteFile({ ...data } as DeleteData);
  }
};