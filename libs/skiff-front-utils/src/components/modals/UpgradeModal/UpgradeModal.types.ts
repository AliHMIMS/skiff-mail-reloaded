import { ApolloClient } from '@apollo/client';

import { SelectItemType } from './UpgradeModal.constants';

export interface ExceededItem {
  numSelected: number;
  maxAllowed: number;
}

export interface UpgradeModalProps {
  client: ApolloClient;
  description: string;
  open: boolean;
  onClose: () => void;
  exceededItems?: {
    [key in keyof SelectItemType]?: ExceededItem;
  };
  title?: string;
}
