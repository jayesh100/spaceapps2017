import React, { Component } from 'react';
// import cx from 'classnames';

import styles from './styles.styl';

export default class Article extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className={styles.article}>
        <div className={styles.header}>
          <h3 className={styles.title}>{this.props.article.title}</h3>
          <div className={styles.sid}>{this.props.article.sid}</div>
        </div>
        <p className={styles.summary}>{this.props.article.summary}</p>
        <div className={styles.source}>{`Source: ${this.props.article.source}`}</div>
      </div>
    );
  }
}

