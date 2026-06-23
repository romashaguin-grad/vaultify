/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Assets
 */
import { Box, Clock, Home } from 'lucide-react';

export const SIDEBAR_LINKS = [
  {
    title: 'Home',
    url: '/drive/home',
    icon: Home,
    isActive: true,
  },
  {
    title: 'My Drive',
    url: '/drive/my-drive',
    icon: Box,
  },
  {
    title: 'Recent',
    url: '/drive/recent',
    icon: Clock,
  },
] as const;

export const AI_OPTIONS = [
  { id: 'e-bgremove', label: 'Remove Background' },
  { id: 'e-dropshadow', label: 'AI Drop Shadow' },
  { id: 'e-retouch', label: 'Retouch' },
  { id: 'e-upscale', label: 'Upscale' },
] as const;
