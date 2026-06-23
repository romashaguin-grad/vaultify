/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { useState, useCallback } from 'react';
import { functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';
import { useFolder } from '@/contexts/FolderContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SparklesIcon } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GenerateImage = ({ open, onOpenChange }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const currentFolderName = useFolder();

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return toast.error('Please enter a prompt');

    setIsGenerating(true);
    setPreview(null);

    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_APPWRITE_FN_ID,
        JSON.stringify({ prompt, folder: `/${currentFolderName}` }),
        false,
        '/generate',
        ExecutionMethod.POST,
      );

      const data = JSON.parse(response.responseBody);
      console.log('Function response:', data);

      if (!data.ok) throw new Error(data.error ?? 'Generation failed');

      setPreview(data.imageUrl);
      toast.success('Image generated and saved to your drive!');
      setPrompt('');

      setTimeout(() => {
        setPreview(null);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, currentFolderName, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-none rounded-none sm:rounded-lg sm:max-w-md'>
        <DialogHeader className='border-b pb-2'>
          <DialogTitle className='flex items-center gap-2 text-lg font-semibold'>
            <SparklesIcon /> Generate Image with AI
          </DialogTitle>
          <DialogDescription>
            Describe an image and it will be saved to your drive.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='prompt'>Prompt</Label>
            <Textarea
              id='prompt'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='A sunset over snowy mountains, photorealistic...'
              rows={3}
              disabled={isGenerating}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt='Generated preview'
              className='w-full rounded-lg'
            />
          )}

          {isGenerating && (
            <p className='text-sm text-muted-foreground animate-pulse'>
              Generating your image, this may take 10-20 seconds...
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            <SparklesIcon className='mr-2 size-4' />
            {isGenerating ? 'Generating...' : 'Generate & Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};