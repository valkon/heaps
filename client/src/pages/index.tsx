import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Container, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from '../redux/actions/items';
import { useGet_All_ItemsQuery, useMeQuery } from '../generated/graphql';
import Home from '../components/Home/Home';
import { useEffect } from 'react';
import { getInitialUser } from '../redux/actions/user';

export interface State {
  user?;
  items?;
}

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();

  const getItemsList = () => {
    const [{ data }] = useGet_All_ItemsQuery();
    return data && data.getAllItems;
  };

  const getMeData = () => {
    const [{ data }] = useMeQuery();
    return data && data.me;
  };

  const itemList = getItemsList();

  const meUser = getMeData();
  console.log({ meUser });

  useEffect(() => {
    dispatch(getAllItems(itemList));
    meUser && dispatch(getInitialUser(meUser));
  });

  const items = useSelector((state: State) => state.items);
  console.log({ items });

  /* const user = useSelector((state: State) => state.user);
  console.log({ user }); */

  //const usename = meUser.username;

  return (
    <Container className={styles.container}>
      {meUser && <Heading>Hello, {meUser.username}!</Heading>}
      <Home />
    </Container>
  );
};

export default IndexPage;
