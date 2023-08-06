import { Button, Menu } from 'semantic-ui-react';
import { useAppDispatch } from '../hooks';
import { openActivityForm } from '../../features/activities/activitySlice';

export default function NavBar() {
  const dispatch = useAppDispatch();

  return (
    <Menu inverted fixed='top'>
      <Menu.Item header>
        <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
        Reactivities
      </Menu.Item>
      <Menu.Item name='Activities' />
      <Menu.Item>
        <Button
          onClick={() => dispatch(openActivityForm({}))}
          positive
          content='Create Activity'
        />
      </Menu.Item>
    </Menu>
  );
}
