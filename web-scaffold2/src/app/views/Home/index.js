import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// import { Link } from 'react-router';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';
import getArticles from 'app/articleApi';
import Article from 'app/components/Article';

import styles from './styles.styl';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loaded: false,
    };
  }

  componentWillMount() {
    this.getArticles();
  }

  getArticles = () => {
    getArticles().then((response) => {
      console.log(response);
      this.setState({
        articles: response.articles,
        time: response.time,
        loaded: true,
      });
    });
  }

  TITLE = 'Home';
  DESCRIPTION = [
    'NASA SpaceApps 2017 Project',
    'Small Spaces, Big Ideas',
  ].join(' ');

  render() {
    return (
      <SpecialLayout className={styles.root}>
        <Helmet>
          <title>{this.TITLE}</title>
          <meta name="description" content={this.DESCRIPTION} />
          <meta property="og:title" content={makeTitle(this.TITLE)} />
          <meta property="og:description" content={this.DESCRIPTION} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={config.twitter.handle} />
          <meta name="twitter:title" content={makeTitle(this.TITLE)} />
          <meta name="twitter:description" content={this.DESCRIPTION} />
        </Helmet>
        {
          this.state.loaded && this.state.articles.map(article => (
            <Article
              article={article}
              key={article.id} />
            )
          )
        }
      </SpecialLayout>
    );
  }
}
