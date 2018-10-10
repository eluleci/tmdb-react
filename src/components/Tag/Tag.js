import React from 'react';
import PropTypes from 'prop-types';

import './Tag.css';

/**
 * Displays a tag UI. Acts like a Checkbox if 'onToggle' and 'highlighted' props are provided.
 */
class Tag extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    highlighted: PropTypes.bool,
  }

  static defaultProps = {
    onToggle: undefined,
    highlighted: false,
  }

  render() {
    const { onToggle, highlighted, text } = this.props;
    const classNames = ['tag'];

    // add extra classes for css
    if (onToggle) {
      classNames.push('selectable');

      if (highlighted) {
        classNames.push('highlighted');
      }
    }

    return (
      <div
        className={classNames.join(' ')}
        onClick={() => {
          onToggle && onToggle()
        }}
      >
        {text}
      </div>
    )
  }
}

export default Tag;
