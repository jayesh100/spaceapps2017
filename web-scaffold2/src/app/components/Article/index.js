import React, { Component } from 'react';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.article = props.article;
  }

  render() {
    return (
      <div className={styles.article}>
        <FontAwesome className={'fa-star'} />
        <p>{this.article.title}</p>
      </div>
    );
  }
}

