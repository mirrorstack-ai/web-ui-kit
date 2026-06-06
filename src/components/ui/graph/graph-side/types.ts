/**
 * Minimal node shape the side panel needs. Structurally compatible with
 * Graph's GraphNode so the same value can be passed to both.
 *
 * Lives here (not in GraphSide.tsx) so sibling components — GraphSideHeader,
 * etc. — can depend on the type without importing back from GraphSide, which
 * would create a component<->sibling cycle.
 */
export interface GraphSideNode {
  id: string;
  label: string;
  /** Single tag rendered as a Badge. Combined with `tags` if both are set. */
  tag?: string;
  /** Multiple tags rendered as Badges in the header. */
  tags?: string[];
}
