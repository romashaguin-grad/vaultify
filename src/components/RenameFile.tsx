/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useState, useEffect, useCallback } from 'react';
import { useFetcher, useFetchers } from 'react-router';
import { toast } from 'sonner';

/**
 * Components
 */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Types
 */
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  filePath: string;
  onSuccess?: () => void;
}

export const RenameFile = ({
  open,
  onOpenChange,
  fileName,
  filePath,
  onSuccess,
}: Props) => {
  const fetcher = useFetcher();

  const [fileNewName, setFileNewName] = useState(fileName);

  const isLoading = fetcher.state !== 'idle';

  // Reset name each time dialog opens
  useEffect(() => {
    if (open) setFileNewName(fileName);
  }, [open, fileName]);

  // Handle submit response
  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('File rename successfully!');
      onSuccess?.();
      onOpenChange(false);
    } else {
      toast.error(fetcher.data.error ?? 'Failed to rename file.');
    }
  }, [onOpenChange, onSuccess, fetcher.data]);

  const handleSubmit = useCallback(() => {
    if (!fileNewName.trim()) {
      toast.error('File name cannot be empty');
      return;
    }

    fetcher.submit(
      { filePath, newName: fileNewName },
      {
        method: 'put',
        encType: 'application/json',
        action: '/drive',
      },
    );
  }, [fileNewName, filePath]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>

          <DialogDescription>
            Change the name of <strong>{fileName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={fileNewName}
          onChange={(e) => setFileNewName(e.currentTarget.value)}
          placeholder='Enter new file name'
          className='mt-4'
        />

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={fetcher.state === 'submitting'}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Renaming...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
