import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

const Layout : React.FC = (props) => {
  return (
      <>
          <NavMenu />
          <Container>
              {props.children}
          </Container>
      </>
  );
}

export default Layout;