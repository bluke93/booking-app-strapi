/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import Calendar from '../Calendar/index'
import Daily from '../Calendar/daily'
import { Provider } from 'react-redux'
import store from '../../utils/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={Calendar} exact  />
          <Route path={`/plugins/${pluginId}/daily`} component={Daily} exact  />
          <Route component={AnErrorOccurred} />
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
