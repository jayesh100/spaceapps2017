import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import scrollToComponent from 'react-scroll-to-component';
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
      this._currentIndex = 0;
      this.articleIds = response.articles.map((article) => article.id);
      this.setState({
        articles: response.articles,
        time: response.time,
        loaded: true,
      });
    });
  }

  incrementScroll = () => {
    this._currentIndex += 1;
    scrollToComponent(this[this.articleIds[this._currentIndex]]);
  }

  TITLE = 'Home';
  DESCRIPTION = [
    'NASA SpaceApps 2017 Project',
    'Small Spaces, Big Ideas',
  ].join(' ');

  render() {
    setTimeout(() => { this.getArticles(); }, 10000);
    setTimeout(() => { this.incrementScroll(); }, 15000);
    return (
      <SpecialLayout className={styles.root} time={this.state.time}>
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
        <div className={styles.articleContainer}>
          {
            this.state.loaded && this.state.articles.map(article => (
              <Article
                article={article}
                key={article.id}
                ref={ref => this[article.id] = ref} />
              )
            )
          }
        </div>
      </SpecialLayout>
    );
  }
}

