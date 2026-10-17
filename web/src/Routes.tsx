import { Suspense } from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router';
import { getEnvironment } from 'skiff-front-utils';

import { Layout } from './components/layout/Layout';
import { MailAppRoutes } from './constants/route.constants';
import lazyloadRoute from './utils/lazyloadRoute';

const Oauth = lazyloadRoute(() => import('./pages/Oauth'));
const FullViewSearch = lazyloadRoute(() => import('./pages/FullViewSearch'));
const UserLabelMailbox = lazyloadRoute(() => import('./pages/UserLabelMailbox'));
const SystemLabelMailbox = lazyloadRoute(() => import('./pages/SystemLabelMailbox'));
const SkemailLoginContainer = lazyloadRoute(() => import('./pages/SkemailLoginContainer'));

export default function Routes() {
  const env = getEnvironment(new URL(window.location.origin));

  return (
    <BrowserRouter basename={MailAppRoutes.MAIL}>
      <Suspense fallback={null}>
        <Layout>
          <RouterRoutes>
            <Route element={<Oauth />} path={MailAppRoutes.OAUTH} />
            <Route element={<FullViewSearch />} path={MailAppRoutes.SEARCH} />
            <Route element={<UserLabelMailbox />} path={MailAppRoutes.USER_LABEL_MAILBOX} />
            <Route element={<SystemLabelMailbox />} path={MailAppRoutes.MAILBOX} />
            <Route element={null} path='*' />
          </RouterRoutes>
        </Layout>
        {/**
         * Only render the skemail login container during local development. If we're not running
         * the app locally and the user is not logged in, we will redirect to the editor login page.
         */}
        {/* self-hosted (mymail-server): also render the login page on our own domain ('review_app') */}
        {(env === 'local' || env === 'review_app') && <SkemailLoginContainer />}
      </Suspense>
    </BrowserRouter>
  );
}
