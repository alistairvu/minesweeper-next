import { GetServerSideProps } from 'next';

const NotFound = () => <div />;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    permanent: true,
    destination: '/',
  },
  props: {},
});

export default NotFound;
