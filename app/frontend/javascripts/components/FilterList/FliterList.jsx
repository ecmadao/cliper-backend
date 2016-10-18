import React from 'react';
import ListItem from './ListItem';
import ActiveItem from './ActiveItem';

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      activeItems: [],
      search: '',
      showItemsModal: false
    };
    this.filterItems = this.filterItems.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleKeyDown() {
    const value = this.search.value;
    this.filterItems(value);
  }

  handleSearchChange() {
    const search = this.search.value;
    this.setState({search});
  }

  filterItems(value) {
    const {items} = this.state;
    const filteredItems = items.filter(item => item.value === value);
    this.setState({
      items: filteredItems
    });
  }

  renderItems() {
    const {items} = this.state;
    return items.map((item, index) => {
      return (
        <ListItem
          key={index}
          item={item}
        />
      );
    });
  }

  renderActiveItems() {
    const {activeItems} = this.state;
    return activeItems.map((activeItem, index) => {
      return (
        <ActiveItem
          key={index}
          item={item}
        />
      );
    });
  }

  render() {
    const {search} = this.state;
    return (
      <div className="filter_list_wrapper">
        <div className="item_chosed_wrapper">
          <i className="fa fa-filter filter_item" aria-hidden="true"></i>
          {this.renderActiveItems()}
        </div>
        <div className="list_items_wrapper">
          <input
            value={search}
            type="text"
            className="list_items_search"
            ref={ref => this.search = ref}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleSearchChange}
          />
          <div className="list_items_container">
            {this.renderItems()}
          </div>
        </div>
      </div>
    )
  }
}

export default FilterList;
