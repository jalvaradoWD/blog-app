import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session, status);
  return <></>;
};

export default Home;
