import React from 'react';
import CliperOperation from './CliperOperation';

class CliperContent extends React.Component {
  render() {
    const {cliper} = this.props;
    return (
      <div className="content_container">
        {cliper.content}
        <CliperOperation
          id={cliper.id}
          love={cliper.love}
        />
      </div>
    )
  }
}

export default CliperContent;
