import { createContext, type ReactNode, use, useMemo, useState } from 'react';
import { SystemLabels } from 'skiff-graphql';

/** The label the mailbox shows: a system label ID (INBOX…) or a user label's ID. */
export interface MailboxLabel {
  id: string;
  name: string;
}

const INBOX: MailboxLabel = { id: SystemLabels.Inbox, name: 'Inbox' };

const LabelContext = createContext<{ label: MailboxLabel; setLabel: (label: MailboxLabel) => void } | null>(null);

export function MailboxLabelProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState(INBOX);
  const value = useMemo(() => ({ label, setLabel }), [label]);
  return <LabelContext value={value}>{children}</LabelContext>;
}

export function useMailboxLabel() {
  const value = use(LabelContext);
  if (!value) throw new Error('useMailboxLabel must be used inside <MailboxLabelProvider>');
  return value;
}
