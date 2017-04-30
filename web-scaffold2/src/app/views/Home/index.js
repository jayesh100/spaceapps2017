import React, { Component, findDOMNode } from 'react';
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash-es';

import { smoothScrollTo } from 'app/lib/scroll';
// import { Link } from 'react-router';
import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';
import getArticles from 'app/articleApi';
import Article from 'app/components/Article';
import trumpFace from 'app/assets/images/trump.jpg';
import politicFace from 'app/assets/images/politician.jpg';
import nasaLogo from 'app/assets/images/NASA_logo.svg';
import car from 'app/assets/images/car.png';

import styles from './styles.styl';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.scrollY = 0;
    this.state = {
      articles: [],
      loaded: false,
    };
  }

  componentWillMount() {
    this.getArticles();
  }

  componentDidMount() {
    this.mounted = true;
    setInterval(() => { this.getArticles(); }, 30000);
    setInterval(() => { this.incrementScroll(); }, 5000);
    this.images = [
      undefined,
      trumpFace,
      politicFace,
      nasaLogo,
      car,
    ];
    this._currentIndex = 0;
  }

  getArticles = () => {
    getArticles().then((response) => {
      console.log(response);
      this.articleIds = response.articles.map(article => article.id);
      this.setState({
        articles: response.articles,
        time: response.time,
        loaded: true,
      });
      if (this.mounted) {
        this.scroll(this.scrollY);
      }
    });
  }

  scroll = debounce((scrollY) => {
    if (!this.isAnimating) {
      this.isAnimating = true;
      smoothScrollTo(scrollY, () => {
        this.isAnimating = false;
      });
    }
  }, 500);

  incrementScroll = () => {
      console.log('Scrolling...');
      if (this.articleIds) {
        this.scrollY = 600 * this._currentIndex;
        this.scroll(this.scrollY);
        console.log('Actual movement...', this.articleIds, this._currentIndex);
        this._currentIndex += 1;
        if (this._currentIndex === (this.articleIds.length - 1)) this._currentIndex = 0;
      }
  }

  TITLE = 'Home';
  DESCRIPTION = [
    'NASA SpaceApps 2017 Project',
    'Small Spaces, Big Ideas',
  ].join(' ');

  render() {
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
                image={this.images[article.image]}
                ref={ref => (this[article.id] = ref)} />
              )
            )
          }
        </div>
      </SpecialLayout>
    );
  }
}

