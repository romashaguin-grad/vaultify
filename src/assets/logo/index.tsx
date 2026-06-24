interface Props extends React.ComponentProps<'svg'> {
  variant?: 'default' | 'icon';
}

export const Logo: React.FC<Props> = ({ variant = 'default', className }) => {
  if (variant === 'icon') {
    return (
      <svg
        width='48'
        height='48'
        viewBox='0 0 160 192'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M80 0 L160 28 L160 100 C160 144 124 176 80 192 C36 176 0 144 0 100 L0 28 Z' fill='#1d4ed8' />
        <path d='M80 16 L148 40 L148 100 C148 136 116 164 80 176 C44 164 12 136 12 100 L12 40 Z' fill='#3b82f6' />
        <path d='M50 75 L68 95 L112 51' stroke='#ffffff' strokeWidth='9' strokeLinecap='round' strokeLinejoin='round' />
        <rect x='54' y='110' width='52' height='34' rx='5' fill='#1e3a8a' />
        <rect x='66' y='102' width='28' height='20' rx='5' stroke='#93c5fd' strokeWidth='3.5' />
        <circle cx='80' cy='125' r='6' fill='#93c5fd' />
        <rect x='77' y='125' width='6' height='8' rx='2' fill='#93c5fd' />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width='40'
        height='48'
        viewBox='0 0 160 192'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M80 0 L160 28 L160 100 C160 144 124 176 80 192 C36 176 0 144 0 100 L0 28 Z' fill='#1d4ed8' />
        <path d='M80 16 L148 40 L148 100 C148 136 116 164 80 176 C44 164 12 136 12 100 L12 40 Z' fill='#3b82f6' />
        <path d='M50 75 L68 95 L112 51' stroke='#ffffff' strokeWidth='9' strokeLinecap='round' strokeLinejoin='round' />
        <rect x='54' y='110' width='52' height='34' rx='5' fill='#1e3a8a' />
        <rect x='66' y='102' width='28' height='20' rx='5' stroke='#93c5fd' strokeWidth='3.5' />
        <circle cx='80' cy='125' r='6' fill='#93c5fd' />
        <rect x='77' y='125' width='6' height='8' rx='2' fill='#93c5fd' />
      </svg>
      <span style={{ fontSize: '24px', fontWeight: 600, color: '#f9fafb', letterSpacing: '-0.5px' }}>Vaultify</span>
    </div>
  );
};