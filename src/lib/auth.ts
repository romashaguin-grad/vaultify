/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { account, OAuthProvider } from './appwrite';

export const handleOAuthLogin = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: 'http://localhost:5173/drive/home',
  });
};
