import React from "react";
import {
  Page,
  Navbar,
  List,
  ListInput,
  Button,
  ListItem,
  NavLeft,
  Link,
  NavTitle,
  NavRight,
  NavTitleLarge,
} from "framework7-react";

const DashboardPage = () => (
  <Page noToolbar>
    <Navbar sliding={false}>
      <NavTitle sliding>Dashboard</NavTitle>
      <NavRight>
        <Button tonal>9 / 2024</Button>
      </NavRight>
    </Navbar>
  </Page>
);

export default DashboardPage;
