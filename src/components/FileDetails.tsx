/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FileInfo } from '@/components/FileInfo';
import { FilePreview } from '@/components/FilePreview';
import { ImgPreviewSidebar } from '@/components/ImgPreviewSidebar';
import { SparklesIcon } from 'lucide-react';
import { functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';
import type { FileDetailsType } from '@/types/all-types';

const summarizeWithGemini = async (fileUrl: string): Promise<string> => {
  const response = await functions.createExecution(
    import.meta.env.VITE_APPWRITE_FN_ID,
    JSON.stringify({ fileUrl }),
    false,
    '/summarize',
    ExecutionMethod.POST,
  );

  const data = JSON.parse(response.responseBody);
  if (!data.ok) throw new Error(data.error ?? 'Could not generate summary');
  return data.summary;
};

export const FileDetails = ({ open, onOpenChange, file }: FileDetailsType) => {
  const isVideo = file.mime.startsWith('video/');
  const isImage = file.mime.startsWith('image/');
  const isPdf = file.mime === 'application/pdf';
  const thumbnail = isImage ? file.url : file.thumbnail;

  const [loading, setLoading] = useState(false);
  const [selectedTransforms, setSelectedTransforms] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<{ [key: string]: string }>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  const transformQuery =
    selectedTransforms.length > 0 ? `tr=${selectedTransforms.join(':')}` : '';

  const handleToggle = useCallback((id: string, promptText?: string) => {
    setLoading(true);
    const transformId = promptText
      ? `${id}-prompt-${promptText.trim().replace(/\s+/g, '_')}`
      : id;
    setSelectedTransforms((prev) =>
      prev.includes(transformId)
        ? prev.filter((item) => item !== transformId)
        : [...prev, transformId],
    );
    if (promptText) {
      setPrompts((prev) => ({ ...prev, [id]: '' }));
    }
  }, []);

  const handlePromptChange = useCallback((id: string, value: string) => {
    setPrompts((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSummarize = useCallback(async () => {
    setSummarizing(true);
    setSummary(null);
    try {
      const result = await summarizeWithGemini(file.url);
      setSummary(result);
    } catch (err) {
      console.error(err);
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setSummarizing(false);
    }
  }, [file.url]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='w-screen h-screen max-w-none rounded-none sm:rounded-lg sm:max-w-6xl overflow-auto'>
        <DialogHeader className='border-b pb-2'>
          <DialogTitle>File Details</DialogTitle>
          <DialogDescription>
            <strong>{file.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className='flex'>
          <FilePreview
            file={file}
            isVideo={isVideo}
            thumbnail={thumbnail}
            transformQuery={transformQuery}
            loading={loading}
            setLoading={setLoading}
            isImage={isImage}
          />

          <div className='w-80 border-l bg-background p-4 flex flex-col gap-4'>
            {isImage ? (
              <ImgPreviewSidebar
                file={file}
                selectedTransforms={selectedTransforms}
                prompts={prompts}
                handleToggle={handleToggle}
                handlePromptChange={handlePromptChange}
              />
            ) : (
              <>
                <div className='border rounded-lg p-5 bg-muted/40'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    File Information
                  </h3>
                  <Separator className='mt-2 mb-4' />
                  <FileInfo file={file} />
                </div>

                {isPdf && (
                  <div className='border rounded-lg p-5 bg-muted/40'>
                    <h3 className='font-semibold text-foreground mb-2 flex items-center gap-2'>
                      <SparklesIcon className='size-4' />
                      AI Summary
                    </h3>
                    <Separator className='mt-2 mb-4' />

                    {summary ? (
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {summary}
                      </p>
                    ) : (
                      <p className='text-sm text-muted-foreground mb-3'>
                        Generate an AI-powered summary of this document.
                      </p>
                    )}

                    <Button
                      className='w-full mt-3'
                      onClick={handleSummarize}
                      disabled={summarizing}
                    >
                      <SparklesIcon className='mr-2 size-4' />
                      {summarizing
                        ? 'Summarizing...'
                        : summary
                          ? 'Regenerate Summary'
                          : 'Summarize'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <DialogFooter className='border-t pt-2' />
      </DialogContent>
    </Dialog>
  );
};