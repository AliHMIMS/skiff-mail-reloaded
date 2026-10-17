import { useCallback } from 'react';
import { generatePath, useNavigate as useRouterNavigate } from 'react-router';
import { SystemLabels } from 'skiff-graphql';

import { MailAppRoutes } from '../constants/route.constants';

export const useNavigate = () => {
  const navigate = useRouterNavigate();

  const navigateToSystemLabel = useCallback(
    /**
     * Use this function to navigate into a system label without triggering a complete rerender
     */
    (systemLabel: SystemLabels, search?: string) => {
      navigate({
        pathname: `${generatePath(MailAppRoutes.MAILBOX, {
          mailboxLabel: systemLabel.toLowerCase()
        })}`,
        search
      });
    },
    [navigate]
  );

  const navigateToUserLabel = useCallback(
    /**
     * Use this function to navigate into a user label without triggering a complete rerender
     */
    (userLabel: string) => {
      const encodedUserLabel = encodeURIComponent(userLabel.toLocaleLowerCase());
      navigate(`${MailAppRoutes.USER_LABEL_MAILBOX}#${encodedUserLabel}`);
    },
    [navigate]
  );

  const navigateToInbox = useCallback(() => {
    navigateToSystemLabel(SystemLabels.Inbox);
  }, [navigateToSystemLabel]);

  const navigateToSearch = useCallback(() => {
    navigate({
      pathname: MailAppRoutes.SEARCH
    });
  }, [navigate]);

  return { navigateToSystemLabel, navigateToUserLabel, navigateToInbox, navigateToSearch };
};

/**
 * this function returns the hashtag(#) param in
 * the url.
 * example: localhost:4200/mail/label#someLabel,
 * the hash param would be: `someLabel`
 * @param url the url string
 * @returns the hashtag(#) param in the url.
 */
export const extractHashParamFromURL = (url: string) => {
  return url.split('#')[1];
};
