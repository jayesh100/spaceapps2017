import React, { Component } from 'react';
// import cx from 'classnames';

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
        <div className={styles.header}>
          <h3 className={styles.title}>{this.article.title}</h3>
          <div className={styles.sid}>{this.article.sid}</div>
        </div>
        <p className={styles.summary}>{this.article.summary}</p>
        <div className={styles.source}>{this.article.source}</div>
      </div>
    );
  }
}

