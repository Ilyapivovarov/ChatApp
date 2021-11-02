import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

import "./Layout.css"

const Layout : React.FC = (props) => {
  return (
      <>
          <NavMenu />
          <Container className={"content-container"}>
              {props.children}
          </Container>
      </>
  );
}

export default Layout;