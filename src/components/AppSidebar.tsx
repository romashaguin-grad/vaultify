/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavUser } from '@/components/NavUser';
import { UploadFile } from '@/components/UploadFile';
import { NewFolder } from '@/components/NewFolder';
import { GenerateImage } from '@/components/GenerateImage';

/**
 * Constants
 */
import { SIDEBAR_LINKS } from '@/constants';

/**
 * Assets
 */
import { Logo } from '@/assets/logo';
import { FolderPlusIcon, PlusIcon, SparklesIcon, UploadIcon } from 'lucide-react';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();
  const location = useLocation();

  const [openUpload, setOpenUpload] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [openGenerateImage, setOpenGenerateImage] = useState(false);

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader>
          <Link to='/drive/home'>
            <Logo
              variant='icon'
              className={cn(state === 'collapsed' ? 'size-8' : 'size-10')}
            />
          </Link>
        </SidebarHeader>

        {/* Primary sidebar items */}
        <SidebarContent className='px-2 mt-3'>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    size={state === 'collapsed' ? 'icon' : 'default'}
                    className={cn(state === 'collapsed' && 'size-8')}
                  >
                    <PlusIcon /> {state === 'expanded' && 'New'}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align='start'
                  side='right'
                  className='w-50 bg-muted'
                >
                  <DropdownMenuItem onClick={() => setOpenCreateFolder(true)}>
                    <FolderPlusIcon className='mr-2 size-4' />
                    Create Folder
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setOpenUpload(true)}>
                    <UploadIcon className='mr-2 size-4' />
                    Upload File
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setOpenGenerateImage(true)}>
                    <SparklesIcon className='mr-2 size-4' />
                    Generate Image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>

            {SIDEBAR_LINKS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                  asChild
                >
                  <Link
                    to={item.url}
                    className='flex items-center gap-2'
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <NavUser />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <UploadFile
        open={openUpload}
        onOpenChange={setOpenUpload}
      />

      <NewFolder
        open={openCreateFolder}
        onOpenChange={setOpenCreateFolder}
      />

      <GenerateImage
        open={openGenerateImage}
        onOpenChange={setOpenGenerateImage}
      />
    </>
  );
};