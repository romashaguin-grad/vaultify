import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cn, formatCustomDate, copyToClipboard } from '@/lib/utils';

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'active')).toBe('base active');
  });

  it('resolves tailwind conflicts correctly', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });
});

describe('formatCustomDate', () => {
  it('returns Today for current date', () => {
    const today = new Date();
    expect(formatCustomDate(today)).toBe('Today');
  });

  it('returns formatted date for same year', () => {
    const date = new Date(new Date().getFullYear(), 0, 15);
    const result = formatCustomDate(date);
    expect(result).toBe('15 Jan');
  });

  it('returns date with year for different year', () => {
    const date = new Date(2020, 5, 10);
    const result = formatCustomDate(date);
    expect(result).toBe('10 Jun 2020');
  });
});

describe('copyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('returns true on success', async () => {
    const result = await copyToClipboard('https://example.com');
    expect(result).toBe(true);
  });

  it('returns false on failure', async () => {
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(
      new Error('denied'),
    );
    const result = await copyToClipboard('https://example.com');
    expect(result).toBe(false);
  });
});