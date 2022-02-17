import { GetStaticProps } from 'next';
import { useState } from 'react';
import axios from 'axios';

import { Htag, Rating, Tag, P, Button, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
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
      <Input placeholder='Test' />
      <Textarea placeholder='Test asd'/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}