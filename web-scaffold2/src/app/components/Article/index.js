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
        <p>{this.article.title}</p>
      </div>
    );
  }
}

