/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Components
 */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { FileInfo } from '@/components/FileInfo';

/**
 * Types
 */
import type { File } from '@/types/all-types';
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File;
}

export const FileInformation = ({ open, onOpenChange, file }: Props) => {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>File Information</SheetTitle>

          <SheetDescription>
            Detail about <strong>{file.name}</strong>
          </SheetDescription>
        </SheetHeader>

        <div className='px-5'>
          <FileInfo file={file} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
