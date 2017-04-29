import React from 'react';
import { Helmet } from 'react-helmet';
// import { Link } from 'react-router';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';

import styles from './styles.styl';


const TITLE = 'Home';
const DESCRIPTION = [
  'NASA SpaceApps 2017 Project',
  'Small Spaces, Big Ideas',
].join(' ');

const HomeView = () => (
  <SpecialLayout className={styles.root}>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:title" content={makeTitle(TITLE)} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={config.twitter.handle} />
      <meta name="twitter:title" content={makeTitle(TITLE)} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Helmet>
  </SpecialLayout>
);

export default HomeView;
