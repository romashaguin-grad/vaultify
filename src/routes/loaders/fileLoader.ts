/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { redirect } from 'react-router';
import axios from 'axios';

/**
 * Custom modules
 */
import { getCurrentUserFolder } from '@/lib/appwrite';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import type { AxiosRequestConfig } from 'axios';

/**
 * Constants
 */
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

const getFiles = async (folderName: string, isRecent?: boolean) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: 'application/json', Authorization: `Basic ${API_KEY}` },
    params: {
      path: folderName || '',
      sort: isRecent ? 'DESC_CREATED' : 'ASC_CREATED',
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getFolders = async (folderName: string) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: 'application/json', Authorization: `Basic ${API_KEY}` },
    params: {
      path: folderName || '',
      type: 'folder',
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const driveFileLoader: LoaderFunction = async () => {
  try {
    const folderName = await getCurrentUserFolder();

    const files = await getFiles(folderName!);
    const recentFiles = await getFiles(folderName!, true);
    const folders = await getFolders(folderName!);

    return { files, recentFiles, folders };
  } catch (err) {
    if (err instanceof AppwriteException) {
      return redirect('/auth/login');
    }

    throw err;
  }
};
