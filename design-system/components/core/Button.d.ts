import { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface ButtonProps {
  children?: ReactNode;
  /** Visual weight. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon node (e.g. a Lucide <svg/>). */
  icon?: ReactNode;
  /** Trailing icon node. */
  iconRight?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

/**
 * Primary action control. Pill-shaped, calm hover (brightness) and press
 * (1px nudge) — no bounce. Use `accent` (clay) only for emergent/crystallise
 * actions; `primary` (cord teal) for the main action on a surface.
 */
export function Button(props: ButtonProps): JSX.Element;
