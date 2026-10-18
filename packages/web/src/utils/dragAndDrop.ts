import { HTML5Backend } from 'react-dnd-html5-backend';

export enum DNDItemTypes {
  MESSAGE_CELL = 'MESSAGE_CELL',
  MAIL_CHIP = 'MAIL_CHIP'
}

export type MessageCellDragObject = {
  threadIDs: string[];
  currRouteLabel: string;
};

function shouldIgnoreDragTarget(domNode: EventTarget | null) {
  return domNode instanceof Element && !!domNode.closest('.ProseMirror');
}

/**
 * return the HTML5Backend, ignores all drag events in .ProseMirror
 */
export const CustomHTML5Backend: typeof HTML5Backend = (manager, globalContext, configuration) => {
  const html5Backend = HTML5Backend(manager, globalContext, configuration);

  const listeners = [
    'handleTopDragStart',
    'handleTopDragStartCapture',
    'handleTopDragEndCapture',
    'handleTopDragEnter',
    'handleTopDragEnterCapture',
    'handleTopDragLeaveCapture',
    'handleTopDragOver',
    'handleTopDragOverCapture',
    'handleTopDrop',
    'handleTopDropCapture'
  ];

  listeners.forEach((name) => {
    // the listener methods aren't part of the public Backend type
    const backend = html5Backend as unknown as Record<string, (e: Event, ...extraArgs: unknown[]) => void>;
    const originalMethod = backend[name];
    if (!originalMethod) return;
    backend[name] = (e, ...extraArgs) => {
      if (!shouldIgnoreDragTarget(e.target)) {
        originalMethod(e, ...extraArgs);
      }
    };
  });

  return html5Backend;
};
