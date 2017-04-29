import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import nasaLogo from 'app/assets/images/NASA_logo.svg';
import config from 'app/config';
import throttle from 'app/lib/throttle';

import styles from './styles.styl';


const EVENTS = [
  'scroll',
  'resize',
];

export default class SiteHeader extends Component {
  static propTypes = {
    threshold: PropTypes.func,
    time: PropTypes.string,
  };

  state = {
    scrolled: false,
  };

  componentDidMount() {
    this.update();
    EVENTS.forEach(event => window.addEventListener(event, this.update));
  }

  componentWillUnmount() {
    EVENTS.forEach(event => window.removeEventListener(event, this.update));
    this.update.cancel();
  }

  update = throttle(() => {
    const threshold = (this.props.threshold && this.props.threshold()) || (window.innerHeight || document.documentElement.clientHeight) / 3;
    this.setState({
      scrolled: window.scrollY > threshold,
    });
  });

  render() {
    const { scrolled } = this.state;
    const { time } = this.props;
    return (
      <header id="siteHeader" className={cx(styles.root, { [styles.scrolled]: scrolled })}>
        <div className={cx(styles.wrapper)}>
          <img className={styles.logo} href={nasaLogo} alt="NASA Logo" />
          <Link to="/" className={styles.siteName}>{config.siteName}</Link>
          <div className={styles.time}>{time}}</div>
        </div>
      </header>
    );
  }
}
