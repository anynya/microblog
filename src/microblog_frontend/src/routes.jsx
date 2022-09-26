import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AlertProvider } from './contexts/alert';
import { Post } from './pages/Post';
import { Follow } from './pages/Follow';
import { Profile } from './pages/Profile';
import { Timeline } from './pages/Timeline';

export function Routes() {
  return (
    <HashRouter basename={'/'}>
      <AlertProvider>
        <Layout>
          <Switch>
            <Route exact path='/post' children={<Post />} />
            <Route exact path='/timeline' children={<Timeline />} />
            <Route exact path='/follow' children={<Follow />} />
            <Route exact path='/profile' children={<Profile />} />
          </Switch>
        </Layout>
      </AlertProvider>
    </HashRouter>
  )
}
