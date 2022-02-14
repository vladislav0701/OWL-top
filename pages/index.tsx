import { useEffect, useState } from 'react';
import { Htag, Rating, Tag } from '../components';
import { Button } from '../components';
import { P } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'>addas</Htag>
      <Button appearance='primary' arrow='right'>Click me</Button>
      <Button appearance='ghost' arrow='down'>Click me</Button>
      <P size='l'>HelloWASDdsdaasd1312 </P>
      <Tag size='s' color='red'>Red</Tag>
      <Tag size='m' color='ghost'>ghost</Tag>
      <Tag size='s' color='grey'>grey</Tag>
      <Tag size='m' color='primary'>primary</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </>
  );
}

export default withLayout(Home);
