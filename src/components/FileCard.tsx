/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useState, useMemo, useCallback } from 'react';
import { Image } from '@imagekit/react';

/**
 * Custom modules
 */
import { formatCustomDate } from '@/lib/utils';

/**
 * Components
 */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { FileMenu } from '@/components/FileMenu';
import { FileDetails } from '@/components/FileDetails';

/**
 * Assets
 */
import { fileIcons } from '@/assets/icons/file';

/**
 * Types
 */
import type { File } from '@/types/all-types';

export const FileCard = ({ file }: { file: File }) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const thumbnail = useMemo(
    () => (file?.mime.startsWith('image/') ? file.url : file.thumbnail),
    [file],
  );

  const getFileIcon = useCallback((mime: string) => {
    if (!mime) return fileIcons.default;

    if (mime.startsWith('image/')) return fileIcons.image;
    if (mime.startsWith('video/')) return fileIcons.video;

    return fileIcons[mime] || fileIcons.default;
  }, []);

  const Icon = getFileIcon(file.mime);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <span className='flex gap-2'>
              {Icon && <Icon />}

              <span>
                {file.name.slice(0, 16)}
                {file.name.length > 18 ? '...' : ''}
              </span>
            </span>

            <FileMenu file={file} />
          </CardTitle>
        </CardHeader>

        <CardContent
          className='grow cursor-pointer'
          onClick={() => setDetailOpen(true)}
        >
          <Image
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            src={thumbnail}
            width={500}
            height={500}
            alt={file.name}
            loading='lazy'
            className='w-full h-full object-cover rounded-lg bg-white'
          />
        </CardContent>

        <CardFooter>
          <p>
            Last Updated:{' '}
            {file.updatedAt ? formatCustomDate(file.updatedAt) : 'Unknown'}
          </p>
        </CardFooter>
      </Card>

      <FileDetails
        open={detailOpen}
        onOpenChange={setDetailOpen}
        file={file}
      />
    </>
  );
};
