import { CSSProperties, MouseEventHandler } from 'react';

export interface GapIndicatorProps {
  /** Number of events hidden by the active projection. */
  count?: number;
  /** Optional start time of the hidden span. */
  from?: string | null;
  /** Optional end time of the hidden span. */
  to?: string | null;
  /** Click to "pull the cord straight" (restore hidden events). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

/**
 * The distinctive Quipu affordance: a dashed placeholder that ACKNOWLEDGES
 * hidden events in a filtered view rather than silently removing them.
 * Clicking restores the full sequence ("pull the cord straight").
 */
export function GapIndicator(props: GapIndicatorProps): JSX.Element;
