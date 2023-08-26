import { Link, NavLink } from 'react-router-dom';
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/userSelectors';
import { logout } from '../store/user/userSlice';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <Menu inverted fixed='top'>
      <Menu.Item as={NavLink} to='/' header>
        <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
        Reactivities
      </Menu.Item>
      <Menu.Item as={NavLink} to='/activities' name='Activities' />
      {/* <Menu.Item as={NavLink} to='/errors' name='TestErrors' /> */}
      <Menu.Item>
        <Button
          as={NavLink}
          to='/create-activity'
          positive
          content='Create Activity'
        />
      </Menu.Item>
      <Menu.Item position='right'>
        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
        <Dropdown pointing='top left' text={user?.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profiles/${user?.username}`}
              text='My profile'
            />
            <Dropdown.Item
              onClick={() => dispatch(logout())}
              text='Logout'
              icon='power'
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}
