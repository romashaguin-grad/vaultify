/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useState } from 'react';

/**
 * Custom modules
 */
import { downloadFile, copyToClipboard } from '@/lib/utils';

/**
 * Components
 */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { RenameFile } from '@/components/RenameFile';
import { FileInformation } from '@/components/FileInformation';
import { DeleteFile } from '@/components/DeleteFile';
import { FileDetails } from '@/components/FileDetails';

/**
 * Assets
 */
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EllipsisVerticalIcon,
  FolderOpenIcon,
  InfoIcon,
  ShareIcon,
  Trash2Icon,
} from 'lucide-react';

/**
 * Types
 */
import type { File } from '@/types/all-types';

export const FileMenu = ({ file }: { file: File }) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-[180px]'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setDetailsOpen(true)}
          >
            <FolderOpenIcon />
            Open File
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => downloadFile(file.url, file.name)}
          >
            <DownloadIcon />
            Download
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setRenameOpen(true)}
          >
            <EditIcon />
            Rename
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShareIcon />
              Share
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () => await copyToClipboard(file.url)}
                >
                  <CopyIcon /> Copy Link
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setInfoOpen(true)}
          >
            <InfoIcon />
            File Information
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant='destructive'
            className='cursor-pointer'
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameFile
        open={renameOpen}
        onOpenChange={setRenameOpen}
        fileName={file.name}
        filePath={file.filePath}
      />

      <FileInformation
        open={infoOpen}
        onOpenChange={setInfoOpen}
        file={file}
      />

      <DeleteFile
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        fileId={file.fileId}
        fileUrl={file.url}
      />

      <FileDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        file={file}
      />
    </>
  );
};
