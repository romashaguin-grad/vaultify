/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { formatDate } from '@/lib/formatDate';

/**
 * Types
 */
import type { File } from '@/types/all-types';

export const FileInfo = ({ file }: { file: File }) => {
  return (
    <div className='space-y-2 text-sm'>
      <p>
        <strong>Name:</strong> {file.name}
      </p>

      <p>
        <strong>Type:</strong> {file.mime}
      </p>

      <p>
        <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
      </p>

      <p>
        <strong>Created:</strong> {formatDate(file.createdAt)}
      </p>

      <p>
        <strong>Updated:</strong> {formatDate(file.updatedAt)}
      </p>
    </div>
  );
};
