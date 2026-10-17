import type { Editor } from '@tiptap/react';
import { IconProps } from 'nightwatch-ui';

export interface ToolBarCommand {
  icon: IconProps['icon'];
  command: (editor: Editor) => void;
  enabled: (editor: Editor) => boolean;
  active: (editor: Editor) => boolean;
  label: string;
  // For a dropdown group, the higher priority is shown in the button if the selection has some active
  // example
  // a bullet list is also a paragraph
  // the button will show bullet list
  priority?: number;
}

export enum ToolBarCommandGroupTypes {
  Dropdown,
  DropdownIcon,
  Normal
}

export interface ToolBarCommandGroup {
  commands: ToolBarCommand[];
  type: ToolBarCommandGroupTypes;
}
