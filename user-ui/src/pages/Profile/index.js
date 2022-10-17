import MultiTab from '../components/MultiTab';
import ProfileHeader from './components/ProfileHeader';
import { Items } from './Tabs';
function Profile() {
  document.title = 'Profile';

  return (
    <>
      <ProfileHeader />
      <MultiTab data={Items} />
    </>
  );
}

export default Profile;
