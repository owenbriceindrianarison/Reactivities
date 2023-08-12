import { NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <Menu inverted fixed='top'>
      <Menu.Item as={NavLink} to='/' header>
        <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
        Reactivities
      </Menu.Item>
      <Menu.Item as={NavLink} to='/activities' name='Activities' />
      <Menu.Item as={NavLink} to='/errors' name='TestErrors' />
      <Menu.Item>
        <Button
          as={NavLink}
          to='/create-activity'
          positive
          content='Create Activity'
        />
      </Menu.Item>
    </Menu>
  );
}
