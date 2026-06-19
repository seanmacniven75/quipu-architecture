import { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface PendantCordProps {
  /**
   * Event type key — drives the colour. Top-level segment of a dot-type
   * (e.g. "diagnostic" from "diagnostic.sync_log"). Known keys: system,
   * customer, agent, internal, escalation, knowledge, diagnostic, sla,
   * resolution. Unknown → cord teal.
   */
  type?: string;
  /** Human label, e.g. "Diagnostics". */
  label: ReactNode;
  /** Event count badge; omit for none. */
  count?: number | null;
  /** Icon node (Lucide svg). Defaults to a coloured dot. */
  icon?: ReactNode;
  /** Selected state — fills with the type colour. */
  active?: boolean;
  /** Triggers the discovery "pop" animation (use on first appearance). */
  isNew?: boolean;
  /** "filter" = discovered pendant cord; "narrative" = saved composition (dashed). */
  variant?: 'filter' | 'narrative';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

/**
 * @startingPoint section="Quipu" subtitle="Dynamic event-type filter chip" viewport="700x150"
 * The signature Quipu control: a dynamically-discovered filter chip for one
 * pendant-cord type. Tinted by type, fills when active, pops in when first
 * discovered. `variant="narrative"` renders a saved multi-type composition.
 * Requires the `quipu-pendant-pop` keyframe (ships in the Components card / app shell).
 */
export function PendantCord(props: PendantCordProps): JSX.Element;
export function pendantTone(type: string): { c: string; bg: string };
