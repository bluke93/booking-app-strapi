/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Route, Switch, BrowserRouter, useLocation } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import Calendar from '../Calendar/index'
import Daily from '../Calendar/daily'
import { Provider } from 'react-redux'
import store from '../../utils/store'
import Base from '../../layouts/Base'

const App = () => {
  const baseUrl = `/admin/plugins/${pluginId}`;
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Base>
              <Route path={`${baseUrl}`} component={Calendar} exact />
              <Route path={`${baseUrl}/daily`} component={Daily} exact />
            </Base>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
