/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

export const formatDate = (dateInput: Date, options = {}) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return date.toLocaleString('en-US', { ...options });
};
