import React, { FC } from 'react';
import { Route, RouteProps, Switch, Redirect } from 'react-router-dom';
import {routeList} from 'core/routeList';

export const Routes: FC = () => {
  const routes = routeList.map((route: RouteProps, i: number) => (
    // eslint-disable-next-line react/no-array-index-key
      <Route key={ i } { ...route } />
    ));

  return (
    <Switch>
      { routes }
      <Redirect to="/" />
    </Switch>
  );
};
