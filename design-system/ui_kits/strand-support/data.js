// Strand Support — sample data for the Quipu UI kit.
// Case #4892 (from the Quipu support-workflow example), rendered as a quipu.
// Each event is a knot on the primary cord. `icon` is a Lucide name.
window.STRAND = (function () {
  const TYPES = {
    system:     { label: 'System',      icon: 'settings-2' },
    customer:   { label: 'Customer',    icon: 'message-circle' },
    agent:      { label: 'Agent',       icon: 'headphones' },
    internal:   { label: 'Internal',    icon: 'lock' },
    diagnostic: { label: 'Diagnostics', icon: 'wrench' },
    knowledge:  { label: 'Knowledge',   icon: 'book-open' },
    escalation: { label: 'Escalation',  icon: 'triangle-alert' },
    sla:        { label: 'SLA',         icon: 'timer' },
    resolution: { label: 'Resolution',  icon: 'circle-check' },
    automation: { label: 'Automation',   icon: 'sparkles' },
  };

  // Ordered by sequenceNumber — the locking knot. `disc` marks the event that
  // first discovers its pendant cord (used for the discovery pop animation).
  const EVENTS = [
    { seq: 1, type: 'system', summary: 'Case #4892 created via web form. Priority: High (Enterprise tier, data-integrity issue).', actor: 'System', initiatedBy: 'system', timestamp: '09:00', entityRefs: ['customer:maria_chen', 'product:cloudsync_pro'], disc: true },
    { seq: 2, type: 'customer', summary: 'Files are disappearing from our shared Marketing folder. We\u2019ve lost 3 client presentations this week. This is affecting live projects.', actor: 'Maria Chen', initiatedBy: 'user', timestamp: '09:02', disc: true },
    { seq: 3, type: 'sla', summary: 'SLA clock started \u2014 4hr first-response target (Enterprise). Auto-tagged: data_loss, selective_sync.', actor: 'System', initiatedBy: 'system', timestamp: '09:02', entityRefs: ['sla:enterprise_4hr'], disc: true },
    { seq: 4, type: 'agent', summary: 'Agent Tom\u00e1s (Tier 1) assigned to the case.', actor: 'System', initiatedBy: 'system', timestamp: '09:05', disc: true },
    { seq: 5, type: 'agent', summary: 'Tom\u00e1s: \u201cI understand this is urgent. Let me investigate immediately \u2014 can you confirm which OS versions your team is running?\u201d', actor: 'Tom\u00e1s Rivera', initiatedBy: 'user', timestamp: '09:08' },
    { seq: 6, type: 'customer', summary: 'Maria: \u201cMix of Windows 11 and macOS Sonoma. It only happens when someone edits a file while another person has it open.\u201d', actor: 'Maria Chen', initiatedBy: 'user', timestamp: '09:14' },
    { seq: 7, type: 'diagnostic', summary: 'Pulled sync logs for Marketing folder \u2014 14 conflict events in 7 days, all concurrent edits on .pptx files.', actor: 'Tom\u00e1s Rivera', initiatedBy: 'agent', timestamp: '09:21', entityRefs: ['diagnostic:sync_log_4892'], subsidiaryCount: 1, disc: true },
    { seq: 8, type: 'diagnostic', summary: 'Conflict-resolution trace: resolver defaults to \u201clast write wins\u201d but fails silently when both clients run v3.8.2.', actor: 'Strand Diagnostic Agent', initiatedBy: 'agent', timestamp: '09:24', entityRefs: ['diagnostic:sync_log_4892'] },
    { seq: 9, type: 'knowledge', summary: 'KB search \u201cselective sync conflict resolution\u201d \u2014 found KB-2891: known concurrent-edit conflict in v3.8.x.', actor: 'Tom\u00e1s Rivera', initiatedBy: 'agent', timestamp: '09:28', entityRefs: ['kb:KB-2891'], disc: true },
    { seq: 10, type: 'internal', summary: 'Tom\u00e1s note: \u201cMatches KB-2891. Fix ships in v3.9.0 next week. Enterprise customer lost deliverables \u2014 needs interim workaround.\u201d', actor: 'Tom\u00e1s Rivera', initiatedBy: 'user', timestamp: '09:31', disc: true },
    { seq: 11, type: 'agent', summary: 'Tom\u00e1s: \u201cIt\u2019s a known conflict-resolution bug. I can enable server-side file locking for your shared folders as an interim fix. Would that work?\u201d', actor: 'Tom\u00e1s Rivera', initiatedBy: 'user', timestamp: '09:36' },
    { seq: 12, type: 'customer', summary: 'Maria: \u201cYes, please enable that immediately. But we also need to recover the lost files if possible.\u201d', actor: 'Maria Chen', initiatedBy: 'user', timestamp: '09:41' },
    { seq: 13, type: 'escalation', summary: 'Escalated to Tier 2 (Data Recovery) \u2014 customer requesting file recovery, requires backend access.', actor: 'Tom\u00e1s Rivera', initiatedBy: 'user', timestamp: '09:44', entityRefs: ['case:4892'], disc: true },
    { seq: 15, type: 'diagnostic', summary: 'Priya queried server-side version history \u2014 3 .pptx files recoverable from 24/48/72hr snapshots.', actor: 'Priya Nair', initiatedBy: 'agent', timestamp: '10:05', entityRefs: ['diagnostic:recovery_4892'], subsidiaryCount: 1 },
    { seq: 18, type: 'agent', summary: 'Priya: \u201cI\u2019ve recovered all 3 presentations to a \u2018Recovered Files\u2019 folder. Can you verify they\u2019re the right versions?\u201d', actor: 'Priya Nair', initiatedBy: 'user', timestamp: '10:22' },
    { seq: 21, type: 'sla', summary: 'SLA check: first response in 22 min (target 4hr). Resolution in 3.4hr \u2014 within target.', actor: 'System', initiatedBy: 'system', timestamp: '12:30', entityRefs: ['sla:enterprise_4hr'] },
    { seq: 22, type: 'resolution', summary: 'Interim resolution: server-side file locking enabled; 3 files recovered. Permanent fix v3.9.0 (Mar 17).', actor: 'Tom\u00e1s Rivera', initiatedBy: 'user', timestamp: '12:34', entityRefs: ['case:4892'], isMeta: true, disc: true },
  ];

  // Cross-case bundle: "Selective Sync Conflict — All Cases"
  const BUNDLE = [
    { seq: 1, type: 'diagnostic', summary: 'Case #4710: First report \u2014 macOS only.', actor: 'Kenji', initiatedBy: 'agent', timestamp: 'Jan 15' },
    { seq: 2, type: 'diagnostic', summary: 'Case #4710: Reproduced on Windows 11.', actor: 'Sara', initiatedBy: 'agent', timestamp: 'Jan 22' },
    { seq: 3, type: 'resolution', summary: 'Case #4710: Workaround deployed (version pinning).', actor: 'Kenji', initiatedBy: 'user', timestamp: 'Feb 3' },
    { seq: 4, type: 'diagnostic', summary: 'Case #4892: 14 conflict events, cross-platform \u2014 root cause confirmed v3.8.2.', actor: 'Tom\u00e1s', initiatedBy: 'agent', timestamp: 'Feb 18' },
    { seq: 5, type: 'resolution', summary: 'Case #4892: 3 files recovered, interim lock enabled.', actor: 'Priya', initiatedBy: 'user', timestamp: 'Feb 19' },
    { seq: 6, type: 'diagnostic', summary: 'Case #5023: Same issue, 2-person team.', actor: 'Sara', initiatedBy: 'agent', timestamp: 'Mar 1' },
    { seq: 7, type: 'resolution', summary: 'Case #4892: Permanent fix confirmed (v3.9.0).', actor: 'Tom\u00e1s', initiatedBy: 'user', timestamp: 'Mar 7' },
  ];

  return { TYPES, EVENTS, BUNDLE };
})();
