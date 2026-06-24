/**
 * @copyright 2026 Romasha Guin
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchProvider, useSearch } from '@/contexts/SearchContext';

const TestComponent = () => {
  const { query, setQuery } = useSearch();
  return (
    <div>
      <span data-testid='query'>{query}</span>
      <button onClick={() => setQuery('mountains')}>Search</button>
      <button onClick={() => setQuery('')}>Clear</button>
    </div>
  );
};

describe('SearchContext', () => {
  it('starts with empty query', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>,
    );
    expect(screen.getByTestId('query').textContent).toBe('');
  });

  it('updates query when setQuery is called', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>,
    );
    await userEvent.click(screen.getByText('Search'));
    expect(screen.getByTestId('query').textContent).toBe('mountains');
  });

  it('clears query correctly', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>,
    );
    await userEvent.click(screen.getByText('Search'));
    await userEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('query').textContent).toBe('');
  });
});