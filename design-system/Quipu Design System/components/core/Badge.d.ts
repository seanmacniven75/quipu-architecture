import { ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
  children?: ReactNode;
  /** @default "neutral" */
  tone?: 'neutral' | 'cord' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  /** soft = tinted background; solid = filled. @default "soft" */
  variant?: 'soft' | 'solid';
  style?: CSSProperties;
}

/**
 * Small status/metadata pill — SLA state, priority, tier, counts.
 * Soft (tinted) by default; use `solid` sparingly for emphasis.
 */
export function Badge(props: BadgeProps): JSX.Element;
