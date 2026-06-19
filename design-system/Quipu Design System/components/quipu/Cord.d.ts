import { ReactNode, CSSProperties, MouseEventHandler } from 'react';
import { EventCardProps } from './EventCard';

export interface CordGapItem {
  gap: true;
  count: number;
  from?: string;
  to?: string;
  id?: string;
}

export type CordItem = (EventCardProps & { id?: string }) | CordGapItem;

export interface CordProps {
  /** Events + gap markers, in sequence. Renders EventCard / GapIndicator with knots. */
  items?: CordItem[] | null;
  /** Alternative: arbitrary nodes laid along the spine. */
  children?: ReactNode;
  /** Handler for gap "pull straight" clicks. */
  onGapClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

/**
 * @startingPoint section="Quipu" subtitle="The primary cord timeline" viewport="700x340"
 * The primary cord: one continuous vertical spine with type-coloured knots,
 * each anchoring an EventCard. Pass `items` (events and {gap:true} markers) for
 * a turnkey filtered timeline. The spine never reflows — filtered-out events
 * become gaps, preserving chronological anchoring.
 */
export function Cord(props: CordProps): JSX.Element;
