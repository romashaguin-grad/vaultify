/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

/**
 * Types
 */
import type { PromptEditorType } from '@/types/all-types';

export const PromptEditor = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onApply,
}: PromptEditorType) => {
  return (
    <div>
      <Label
        htmlFor={id}
        className='text-sm'
      >
        {label}
      </Label>

      <Textarea
        id={id}
        placeholder={placeholder}
        className='mt-2'
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />

      <Button
        size='sm'
        variant='secondary'
        className='mt-3 w-full'
        onClick={onApply}
        disabled={!value.trim()}
      >
        Apply Changes
      </Button>
    </div>
  );
};
