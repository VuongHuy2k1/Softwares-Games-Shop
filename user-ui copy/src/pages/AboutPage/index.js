import ProfileCard from 'src/components/ProfileCard';
import { data } from './data';
function AboutPage() {
  document.title = 'About us';

  return (
    <>
      {data.map((item, index) => {
        return <ProfileCard data={item} key={index} />;
      })}
    </>
  );
}

export default AboutPage;
