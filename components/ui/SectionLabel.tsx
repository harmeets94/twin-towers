type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'light';
};

export function SectionLabel({ children, variant = 'default' }: Props) {
  return (
    <span className={`section-label ${variant === 'light' ? 'light' : ''}`.trim()}>
      {children}
    </span>
  );
}
