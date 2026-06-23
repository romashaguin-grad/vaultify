/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Components
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PromptEditor } from '@/components/PromptEditor';
import { FileInfo } from '@/components/FileInfo';

/**
 * Constants
 */
import { AI_OPTIONS } from '@/constants';

/**
 * Types
 */
import type { ImgPreviewSidebarType } from '@/types/all-types';

/**
 * Assets
 */
import { InfoIcon, SparklesIcon } from 'lucide-react';

export const ImgPreviewSidebar = ({
  file,
  selectedTransforms,
  prompts,
  handleToggle,
  handlePromptChange,
}: ImgPreviewSidebarType) => {
  return (
    <Tabs
      defaultValue='ai'
      className='flex flex-col h-full'
    >
      <TabsList className='grid grid-cols-2 w-full mb-4'>
        <TabsTrigger value='ai'>
          <SparklesIcon /> AI Tools
        </TabsTrigger>

        <TabsTrigger value='info'>
          <InfoIcon /> Info
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value='ai'
        className='flex flex-col gap-6'
      >
        <div className='space-y-4 rounded-xl border p-4 bg-muted/40'>
          <h3 className='text-sm font-semibold text-muted-foreground mb-2'>
            Quick AI Tools
          </h3>

          {AI_OPTIONS.map(({ id, label }) => (
            <div
              key={id}
              className='flex items-center justify-between'
            >
              <Label
                htmlFor={id}
                className='text-sm'
              >
                {label}
              </Label>

              <Switch
                id={id}
                checked={selectedTransforms.includes(id)}
                onCheckedChange={() => handleToggle(id)}
              />
            </div>
          ))}
        </div>

        <div className='space-y-4 rounded-xl border p-4 bg-muted/30'>
          <h3 className='flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2'>
            ✨ Edit with Prompts
          </h3>

          <PromptEditor
            id='change-bg'
            label='Change Background'
            placeholder='Describe the new background...'
            value={prompts['change-bg'] || ''}
            onChange={(value: string) => handlePromptChange('change-bg', value)}
            onApply={() => handleToggle('e-changebg', prompts['change-bg'])}
          />

          <PromptEditor
            id='edit-img'
            label='Edit Image'
            placeholder='Describe the edits...'
            value={prompts['edit-img'] || ''}
            onChange={(value: string) => handlePromptChange('edit-img', value)}
            onApply={() => handleToggle('e-edit', prompts['edit-img'])}
          />
        </div>
      </TabsContent>

      <TabsContent value='info'>
        <FileInfo file={file} />
      </TabsContent>
    </Tabs>
  );
};
