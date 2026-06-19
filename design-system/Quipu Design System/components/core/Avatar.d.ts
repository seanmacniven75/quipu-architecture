import { CSSProperties } from 'react';

export interface AvatarProps {
  /** Full name — initials are derived from it. */
  name?: string;
  /** Optional image URL; falls back to initials. */
  src?: string | null;
  /** Pixel diameter. @default 32 */
  size?: number;
  /** Tints + shapes the avatar by actor. People = round; system = squared. */
  actor?: 'user' | 'agent' | 'system' | null;
  style?: CSSProperties;
}

/**
 * Identity chip for an actor on the cord. Round for people/agents, squared for
 * system. Agent avatars take the agent (teal) tone so AI actions read at a glance.
 */
export function Avatar(props: AvatarProps): JSX.Element;
