import { Card, Icon, Image } from 'semantic-ui-react';
import { Profile } from '../../store/profile/model/profile';
import { Link } from 'react-router-dom';

interface Props {
  profile: Profile;
}

export function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>Bio goes here</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        10 followers
      </Card.Content>
    </Card>
  );
}
