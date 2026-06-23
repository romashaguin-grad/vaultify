/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { useLoaderData } from 'react-router';
import { useMemo } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { FolderCard } from '@/components/FolderCard';
import { FileCard } from '@/components/FileCard';
import { useSearch } from '@/contexts/SearchContext';
import type { File } from '@/types/all-types';
import { ChevronDownIcon } from 'lucide-react';

export const Home = () => {
  const { files, folders } = useLoaderData();
  const { query } = useSearch();

  const filteredFiles = useMemo(
    () =>
      files.filter((file: File) =>
        file.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [files, query],
  );

  const filteredFolders = useMemo(
    () =>
      folders.filter((folder: any) =>
        folder.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [folders, query],
  );

  return (
    <>
      <h1 className='text-2xl font-medium'>Welcome to Vaultify!</h1>

      <div className='space-y-6 mt-4'>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer'>
            Suggested Folders <ChevronDownIcon />
          </CollapsibleTrigger>

          <CollapsibleContent className='overflow-hidden transition-all duration-300'>
            {filteredFolders.length === 0 ? (
              <p className='text-muted-foreground text-sm mt-4'>
                No folders found.
              </p>
            ) : (
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                {filteredFolders.map((folder: any, i: number) => (
                  <FolderCard
                    key={i}
                    folder={folder}
                  />
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer'>
            Suggested Files ({filteredFiles.length}) <ChevronDownIcon />
          </CollapsibleTrigger>

          <CollapsibleContent className='overflow-hidden transition-all duration-300'>
            {filteredFiles.length === 0 ? (
              <p className='text-muted-foreground text-sm mt-4'>
                No files found.
              </p>
            ) : (
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                {filteredFiles.map((file: File, i: number) => (
                  <FileCard
                    key={i}
                    file={file}
                  />
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};