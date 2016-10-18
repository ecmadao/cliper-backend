import React from 'react';

class ListItem extends React.Component {
  render() {
    const {item, handleChose, active, handleUnchose} = this.props;
    const itemClass = active ? "list_item active" : "list_item";
    return (
      <div
        className={itemClass}
        onClick={() => {
          if (active) {
            handleUnchose(item.value);
          } else {
            handleChose(item.value);
          }
        }}
      >
        <i className="fa fa-tag" aria-hidden="true"></i>&nbsp;
        {item.value}
      </div>
    )
  }
}

export default ListItem;
