import * as IDB from 'idb-keyval';
import { useEffect } from 'react';
import { skemailSearchIndexIDBKey } from 'skiff-front-search';
import { useCurrentUserData } from 'skiff-front-utils';

/**
 * Search runs on the server; drop the index earlier versions built in the browser (it holds the whole mailbox).
 */
export function useDeleteLocalSearchIndex() {
  const userID = useCurrentUserData()?.userID;
  useEffect(() => {
    if (userID) void IDB.del(skemailSearchIndexIDBKey(userID));
  }, [userID]);
}
