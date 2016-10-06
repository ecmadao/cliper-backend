import React from 'react';
import classNames from 'classnames';
import CliperOperation from './CliperOperation';

class CliperContent extends React.Component {
  render() {
    const {cliper} = this.props;
    const containerClass = classNames('content_container', {
      'loved': cliper.love
    });
    return (
      <div className={containerClass}>
        {cliper.content}
        <CliperOperation
          id={cliper.id}
          love={cliper.love}
        />
        {/* <i
          className="fa fa-times cliper_remove"
          aria-hidden="true"
          onClick={() => {
          deleteCliper(id);
        }}></i> */}
      </div>
    )
  }
}

export default CliperContent;
