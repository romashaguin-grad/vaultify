/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { Outlet, useLoaderData } from 'react-router';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/AppSidebar';
import { FolderProvider } from '@/contexts/FolderContext';
import { SearchProvider, useSearch } from '@/contexts/SearchContext';
import { SearchIcon } from 'lucide-react';

const SearchBar = () => {
  const { query, setQuery } = useSearch();
  return (
    <div className='flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 flex-1 max-w-sm'>
      <SearchIcon className='size-4 text-muted-foreground shrink-0' />
      <input
        type='text'
        placeholder='Search files...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground'
      />
    </div>
  );
};

export const AppLayout = () => {
  const { user } = useLoaderData();
  const folderName = user.$id;

  return (
    <FolderProvider folderName={folderName}>
      <SearchProvider>
        <SidebarProvider>
          <TooltipProvider
            delayDuration={500}
            disableHoverableContent
          >
            <AppSidebar
              collapsible='icon'
              variant='sidebar'
            />

            <SidebarInset>
              <header className='flex items-center gap-3 p-2 border-b'>
                <SidebarTrigger className='mr-2' />
                <h1 className='font-semibold text-lg'>Dashboard</h1>
                <div className='flex-1' />
                <SearchBar />
              </header>

              <main className='flex-1 p-4 overflow-y-auto'>
                <Outlet />
              </main>
            </SidebarInset>
          </TooltipProvider>
        </SidebarProvider>
      </SearchProvider>
    </FolderProvider>
  );
};