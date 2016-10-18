import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem';
import ActiveItem from './ActiveItem';

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    const {items, activeItems} = this.props;
    this.state = {
      items: items || [],
      activeItems: activeItems || [],
      search: '',
      showItemsModal: false
    };
    this.filterItems = this.filterItems.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleItemChose = this.handleItemChose.bind(this);
    this.handleItemUnchose = this.handleItemUnchose.bind(this);
    this.handleModalStatusChange = this.handleModalStatusChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('mousedown', this.handleOutsideClick, true);
    } else {
      document.attachEvent('onmousedown', this.handleOutsideClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('mousedown', this.handleOutsideClick, true);
    } else {
      document.detachEvent('onmousedown', this.handleOutsideClick);
    }
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

  checkIfItemIsActive() {
    const {activeItems} = this.state;
    return (item) => {
      return activeItems.some(activeItem => item.id === activeItem.id);
    };
  }

  resetItems() {
    const {items} = this.props;
    const checkIsActive = this.checkIfItemIsActive();
    const filteredItems = items.filter(item => !checkIsActive(item));
    this.setState({
      items: filteredItems
    });
  }

  handleItemChose(id) {
    const {items, activeItems} = this.state;
    const targetItem = items.filter(item => item.id === id);
    if (targetItem && targetItem.length) {
      this.setState({
        items: items.filter(item => item.id !== id),
        activeItems: [...activeItems, targetItem[0]]
      });
    }
  }

  handleItemUnchose(id) {
    const {items, activeItems} = this.state;
    const targetItem = activeItems.filter(activeItem => activeItem.id === id);
    if (targetItem && targetItem.length) {
      this.setState({
        items: [...items, targetItem[0]],
        activeItems: activeItems.filter(activeItem => activeItem.id !== id)
      });
    }
  }

  handleModalStatusChange(status) {
    this.setState({
      showItemsModal: status
    });
  }

  handleOutsideClick(e) {
    e = e || window.event;
    const mouseTarget = (typeof e.which !== "undefined") ? e.which : e.button;
    const modal = ReactDOM.findDOMNode(this.modal);
    const isDescendantOfRoot = modal && modal.contains(e.target);
    if (!isDescendantOfRoot && mouseTarget === 1) {
      this.handleModalStatusChange(false);
    }
  }

  renderItems() {
    const {items} = this.state;
    return items.map((item, index) => {
      return (
        <ListItem
          key={index}
          item={item}
          handleChose={this.handleItemChose}
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
          item={activeItem}
          handleUnchose={this.handleItemUnchose}
        />
      );
    });
  }

  render() {
    const {search, showItemsModal} = this.state;
    const listWrapperClass = showItemsModal ? "list_items_wrapper active" : "list_items_wrapper";
    return (
      <div className="filter_list_wrapper">
        <div className="item_chosed_wrapper">
          <i
            className="fa fa-filter filter_item"
            aria-hidden="true"
            onClick={() => {
              this.handleModalStatusChange(true);
            }}
          ></i>&nbsp;
          {this.renderActiveItems()}
        </div>
        <div className={listWrapperClass} ref={ref => this.modal = ref}>
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
