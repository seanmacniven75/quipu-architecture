import { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface EntityRefChip {
  label: string;
  uri?: string;
}

export interface EventCardProps {
  /** Sequence number on the primary cord (the locking-knot position). */
  seq?: number | null;
  /** Dot-separated event type — drives colour. */
  type?: string;
  /** Human label; defaults to the top-level type segment. */
  typeLabel?: ReactNode;
  /** Type icon node (Lucide svg). */
  icon?: ReactNode;
  /** One-line human summary (the knot's payload digest). */
  summary?: ReactNode;
  /** Optional secondary detail line. */
  detail?: ReactNode;
  /** Actor display name. */
  actor?: string;
  /** @default "system" */
  initiatedBy?: 'user' | 'agent' | 'system';
  /** Formatted timestamp string. */
  timestamp?: string;
  /** Linked persistent entities — strings or {label, uri}. */
  entityRefs?: Array<string | EntityRefChip>;
  /** Count of subsidiary (child) events nested under this one. */
  subsidiaryCount?: number;
  /** Renders the "bundled" meta-event tag. */
  isMeta?: boolean;
  /** Dimmed when not matching the active projection. @default true */
  active?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  style?: CSSProperties;
}

/**
 * @startingPoint section="Quipu" subtitle="A single knot on the primary cord" viewport="700x150"
 * One event ("knot") on the primary cord. Type-coloured icon + mono type label,
 * summary, entity-ref chips, actor footer, subsidiary count. Compose many inside
 * <Cord/>. Agent/system actors are distinguished by the footer Avatar tone.
 */
export function EventCard(props: EventCardProps): JSX.Element;
