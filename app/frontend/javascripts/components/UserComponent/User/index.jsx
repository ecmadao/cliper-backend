import React from 'react';
import {connect} from 'react-redux';
import LoadingModal from '../../LoadingModal/index';
import Clipers from './Clipers';
import CliperComments from './CliperComments/index';

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

  componentDidMount() {
    const {fetchClipers} = this.props;
    fetchClipers && fetchClipers();
    // const $sliperSearch = $('.cliper_search');
    // const sliperSearchTop = $sliperSearch.offset().top;
    // const $document = $(document);
    // $(window).scroll(() => {
    //   let currentTop = $document.scrollTop();
    //   if (currentTop > sliperSearchTop) {
    //     $sliperSearch.addClass('search_in_top');
    //   } else {
    //     $sliperSearch.removeClass('search_in_top');
    //   }
    // });
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
        <LoadingModal showModal={false} />
        <CliperComments />
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
        <Clipers />
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
