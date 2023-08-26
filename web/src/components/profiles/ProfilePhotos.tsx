import { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { Photo, Profile } from '../../store/profile/model/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectIsCurrentUser,
  selectUploadLoading,
} from '../../store/profile/profileSelectors';
import { PhotoUploadWidget } from '../image-upload/PhotoUploadWidget';
import {
  deletePhotoAsync,
  setMainPhotoAsync,
} from '../../store/profile/profileActions.thunk';

interface Props {
  profile: Profile;
}

export function ProfilePhotos({ profile }: Props) {
  const dispatch = useAppDispatch();
  const isCurrentUser = useAppSelector(selectIsCurrentUser);
  const loading = useAppSelector(selectUploadLoading);
  const [addPhotoMode, setAddPhotoMode] = useState<boolean>(false);
  const [target, setTarget] = useState('');

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    dispatch(setMainPhotoAsync(photo));
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    dispatch(deletePhotoAsync(photo));
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos' />

          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget setAddPhotoMode={setAddPhotoMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url || '/assets/user.png'} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color='green'
                        content='Main'
                        name={'main' + photo.id}
                        loading={target === 'main' + photo.id && loading}
                        disabled={photo.isMain}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        basic
                        color='red'
                        icon='trash'
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
