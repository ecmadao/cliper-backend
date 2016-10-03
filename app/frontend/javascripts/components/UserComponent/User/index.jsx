import React from 'react';
import {connect} from 'react-redux';
import LoadingModal from '../../LoadingModal/index';

import {
  fetchClipers,
  changeSearchContent
} from '../redux/actions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    if (e.which === 13) {

    }
  }

  handleSearchChange() {
    const search = this.search.value;
    const {changeSearchContent} = this.props;
    changeSearchContent && changeSearchContent(search);
  }

  render() {
    const {loading, search} = this.props;
    return (
      <div className="user_component">
        <LoadingModal showModal={false}/>
        <div className="cliper_search">
          <input
            placeholder="search.."
            value={search}
            className="input input_huge search_input"
            ref={ref => this.search = ref}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeyDown}
          />
          <i
            className="fa fa-space-shuttle search_button"
            aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {clipers, loading, search} = state;
  return {clipers, loading, search};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchClipers: () => {
      dispatch(fetchClipers());
    },
    changeSearchContent: (search) => {
      dispatch(changeSearchContent(search));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
