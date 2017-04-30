import React, { Component } from 'react';
import cx from 'classnames';

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
          <div className={styles.sid}>{this.props.article.sId}</div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.image}>{this.props.image && (<img alt={`Preview for ${this.props.article.sId}`} src={this.props.image} />)}</div>
          <div className={cx(styles.summary, { [styles.summaryWithImage]: this.props.article.image })}>{this.props.article.summary}</div>
        </div>
        <div className={styles.source}>{`Source: ${this.props.article.source}`}</div>
        <div className={styles.source}>{`Timestamp: ${this.props.article.timestamp}`}</div>
      </div>
    );
  }
}

