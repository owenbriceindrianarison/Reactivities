import { Grid } from 'semantic-ui-react';
import { ProfileHeader } from '../../components/profiles/ProfileHeader';
import { ProfileContent } from '../../components/profiles/ProfileContent';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { loadProfilesAsync } from '../../store/profile/profileActions.thunk';
import {
  selectProfile,
  selectStatus,
} from '../../store/profile/profileSelectors';
import LoadingComponent from '../../components/LoadingComponent';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const loadingProfile = useAppSelector(selectStatus);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (username) dispatch(loadProfilesAsync(username));
  }, [username]);

  if (loadingProfile === 'loading')
    return <LoadingComponent content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
