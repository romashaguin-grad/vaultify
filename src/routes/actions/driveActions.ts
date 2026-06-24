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
  const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);
  const response = await fetch(
    `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/rename`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${API_KEY}`,
      },
      body: JSON.stringify({
        filePath: data?.filePath,
        newFileName: data?.newName,
        purgeCache: true,
      }),
    },
  );
  if (!response.ok) return { ok: false, error: 'Failed to rename file' };
  return { ok: true, message: 'File renamed successfully' };
};

export const deleteFile = async (data: DeleteData) => {
  const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);
  const response = await fetch(
    `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/${data.fileId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${API_KEY}`,
      },
    },
  );
  if (!response.ok) return { ok: false, error: 'Failed to delete file' };
  return { ok: true, message: 'File deleted successfully' };
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