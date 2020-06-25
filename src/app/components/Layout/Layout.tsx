import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const LayoutComponent: FC = ({ children }) =>
  // const contentProps = {
  //   style: layoutStore.contentStyle,
  // };

   (
    <div>
      work
      { children }
    </div>
  )
;

export const Layout = withRouter(LayoutComponent);
