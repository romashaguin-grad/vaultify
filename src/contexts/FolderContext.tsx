/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { createContext, useContext } from 'react';

/**
 * Types
 */
type Props = {
  folderName: string;
  children: React.ReactNode;
};

const FolderContext = createContext<string | null>(null);

export const FolderProvider = ({ folderName, children }: Props) => {
  return (
    <FolderContext.Provider value={folderName}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => {
  const ctx = useContext(FolderContext);

  if (!ctx) {
    throw new Error('useFolder must be used inside FolderProvider');
  }

  return ctx;
};
