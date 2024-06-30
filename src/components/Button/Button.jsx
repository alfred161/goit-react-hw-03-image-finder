import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Button.module.css';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={css.buttonContainer}>
        <button className={css.button} onClick={this.props.onClick}>
          Load more
        </button>
      </div>
    );
  }
}
