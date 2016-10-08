import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
  handleCliperDelete,
  handleCommentModalOpen,
  handleCliperLoveStatusChange
} from '../../redux/actions';

class CliperOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
    this.showOperationMenu = this.showOperationMenu.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleOutside = this.handleOutside.bind(this);
  }

  showOperationMenu() {
    this.setState({
      showMore: true
    });
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('click', this.handleOutside, true);
      // document.addEventListener('mouseover', this.handleOutside, true);
    } else {
      document.attachEvent('click', this.handleOutside);
      // document.attachEvent('mouseover', this.handleOutside);
    }
  }

  handleOutside(e) {
    e = e || window.event;
    const mouseTarget = (typeof e.which !== "undefined") ? e.which : e.button;
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.menu).contains(e.target);
    // const isHoverDescendantOfRoot = ReactDOM.findDOMNode(this.operations).contains(e.target);
    if (!isDescendantOfRoot) {
      this.setState({
        showMore: false
      });
    }
  }

  handleOutsideClick(e) {
    e = e || window.event;
    const mouseTarget = (typeof e.which !== "undefined") ? e.which : e.button;
    // const isDescendantOfRoot = document.getElementById('operations_menu').contains(e.target);
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.menu).contains(e.target);
    if (!isDescendantOfRoot) {
      this.setState({
        showMore: false
      });
    }
  }

  render() {
    const {
      id,
      love,
      deleteCliper,
      changeLoveStatus,
      openCommentModal
    } = this.props;
    const {showMore} = this.state;
    const starIconClass = classNames('fa cliper_operation cliper_love', {
      'fa-star-o': !love,
      'fa-star': love,
      'active': love
    });
    const menuClass = classNames('operations_menu', {
      'active': showMore
    });
    return (
      <div
        className="cliper_operations"
        ref={ref => this.operations = ref}>
        <div className="cliper_operations_container">
          <div
            className="cliper_operation_wrapper"
            onClick={this.showOperationMenu}>
            <i
              className="fa fa-ellipsis-h cliper_operation"
              aria-hidden="true"></i>
          </div>
          <div
            className="cliper_operation_wrapper"
            onClick={() => {
              changeLoveStatus(id, !love);
            }}>
            <i
              className={starIconClass}
              aria-hidden="true"></i>
          </div>
          <div
            className={menuClass}
            id="operations_menu"
            ref={ref => this.menu = ref}>
            <div className="menu_operation" onClick={() => {
              openCommentModal(id);
            }}>
              <i className="fa fa-comment-o"></i>&nbsp;备注
            </div>
            <div className="menu_operation" onClick={() => {
              deleteCliper(id);
            }}>
              <i className="fa fa-trash"></i>&nbsp;删除
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoveStatus: (id, status) => {
      dispatch(handleCliperLoveStatusChange(id, status));
    },
    openCommentModal: (id) => {
      dispatch(handleCommentModalOpen(id));
    },
    deleteCliper: (id) => {
      dispatch(handleCliperDelete(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CliperOperation);
