/**
 * @copyright 2026 Romasha Guin
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { LoginForm } from '@/components/LoginForm';

const renderWithRouter = (component: React.ReactNode) => {
  const router = createMemoryRouter([
    { path: '/', element: component },
  ]);
  return render(<RouterProvider router={router} />);
};

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders login button', () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders continue with google button', () => {
    renderWithRouter(<LoginForm />);
    expect(
      screen.getByRole('button', { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
  });
});