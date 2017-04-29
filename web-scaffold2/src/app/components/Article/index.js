import React, { Component } from 'react';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.article = props.article;
  }

  render() {
    return (
      <div>
        <FontAwesome className={'fa-star'} />
        <p>{this.article.title}</p>
      </div>
    );
  }
}
