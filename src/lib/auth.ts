/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

import { account, OAuthProvider } from './appwrite';

export const handleOAuthLogin = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: `${window.location.origin}/drive/home`,
    failure: `${window.location.origin}/auth/login`,
  });
};