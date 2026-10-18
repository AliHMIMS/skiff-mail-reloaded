import { Remote, wrap } from 'comlink';
import * as IDB from 'idb-keyval';

import type { EditorSearchIndex } from './editor';
import type { SkemailSearchIndex } from './skemail';
import { editorSearchIndexIDBKey, skemailSearchIndexIDBKey } from './types';

// need to only import types for these to prevent including them in the index output file
// (they should only be included from the skemail and editor worker entrypoints)

// Create a search index wrapped in a WebWorker specifically for Skemail
// Should be called directly, no need to manually create a webworker for this function
export const createWorkerizedSkemailSearchIndex = async (
  userID: string,
  userKeys: { publicKey: string; privateKey: string }
) => {
  const worker = new Worker(new URL('./skemail.ts', import.meta.url), { type: 'module' });
  const workerizedSearchIndex = wrap<typeof SkemailSearchIndex>(worker);
  IDB.del(`${userID}:MailSearchIndex`); // delete search index data created before introducing this library

  const encryptedSearchData = await IDB.get(skemailSearchIndexIDBKey(userID));
  return {
    searchIndex: await new workerizedSearchIndex(userID, userKeys, encryptedSearchData),
    terminate: () => worker.terminate()
  };
};

// Create a search index wrapped in a WebWorker specifically for Editor
// Should be called directly, no need to manually create a webworker for this function
export const createWorkerizedEditorSearchIndex = async (
  userID: string,
  userKeys: { publicKey: string; privateKey: string }
) => {
  const worker = new Worker(new URL('./editor.ts', import.meta.url), { type: 'module' });
  const workerizedSearchIndex = wrap<typeof EditorSearchIndex>(worker);
  IDB.del(`${userID}:searchIndex`); // delete search index data created before introducing this library

  const encryptedSearchData = await IDB.get(editorSearchIndexIDBKey(userID));
  return {
    searchIndex: await new workerizedSearchIndex(userID, userKeys, encryptedSearchData),
    terminate: () => worker.terminate()
  };
};

export type WorkerizedEditorSearchIndex = Remote<InstanceType<typeof EditorSearchIndex>>;
