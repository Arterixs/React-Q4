import Head from 'next/head';

import styles from 'styles/Error.module.css';

const MESSAGE_ERROR = 'Something went wrong. Refresh the page after some time.';

const Error = () => (
  <>
    <Head>
      <title>Planets Star Wars</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.div}>
      <h1>{MESSAGE_ERROR}</h1>
    </div>
  </>
);

export default Error;
