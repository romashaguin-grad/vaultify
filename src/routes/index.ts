/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { createBrowserRouter, redirect } from 'react-router';

/**
 * Pages
 */
import { Home } from '@/pages/drive/Home';
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { AppLayout } from '@/layouts/AppLayout';
import { MyDrive } from '@/pages/drive/MyDrive';
import { RecentFiles } from '@/pages/drive/RecentFiles';
import { FolderPreview } from '@/pages/drive/FolderPreview';

/**
 * Actions
 */
import { loginAction } from '@/routes/actions/login';
import { signupAction } from '@/routes/actions/signup';
import { forgotPasswordAction } from '@/routes/actions/forgotPassword';
import { resetPasswordAction } from '@/routes/actions/resetPassword';
import { driveActions } from '@/routes/actions/driveActions';

/**
 * Loaders
 */
import { driveLoader } from '@/routes/loaders/drive';
import { driveFileLoader } from '@/routes/loaders/fileLoader';
import { driveFolderLoader } from '@/routes/loaders/folderLoader';

/**
 * Error pages
 */
import { RootError } from '@/pages/error/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/auth/login'),
    ErrorBoundary: RootError,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        Component: Login,
        action: loginAction,
      },
      {
        path: 'signup',
        Component: Signup,
        action: signupAction,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
        action: forgotPasswordAction,
      },
      {
        path: 'reset-password',
        Component: ResetPassword,
        action: resetPasswordAction,
      },
    ],
  },
  {
    path: '/drive',
    Component: AppLayout,
    loader: driveLoader,
    action: driveActions,
    children: [
      {
        path: 'home',
        Component: Home,
        loader: driveFileLoader,
      },
      {
        path: 'my-drive',
        Component: MyDrive,
        loader: driveFileLoader,
      },
      {
        path: 'recent',
        Component: RecentFiles,
        loader: driveFileLoader,
      },
      {
        path: 'folders/:folderName',
        Component: FolderPreview,
        loader: driveFolderLoader,
      },
    ],
  },
]);
