/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { useLoaderData } from 'react-router';
import { useMemo } from 'react';
import { FileCard } from '@/components/FileCard';
import { useSearch } from '@/contexts/SearchContext';
import type { File } from '@/types/all-types';

export const MyDrive = () => {
  const { files } = useLoaderData();
  const { query } = useSearch();

  const filteredFiles = useMemo(
    () =>
      files.filter((file: File) =>
        file.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [files, query],
  );

  return (
    <>
      <h1 className='text-2xl font-medium'>My Drive</h1>

      {filteredFiles.length === 0 ? (
        <p className='text-muted-foreground text-sm mt-4'>No files found.</p>
      ) : (
        <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          {filteredFiles.map((file: File, i: number) => (
            <FileCard
              file={file}
              key={i}
            />
          ))}
        </section>
      )}
    </>
  );
};