import React from 'react';
import {connect} from 'react-redux';
import LoadingModal from '../../LoadingModal/index';
import Clipers from './Clipers';
import CliperComments from './CliperComments/index';
import FilterList from '../../FilterList/index';

import {
  getClipersByQuery,
  changeSearchContent,
  resetActiveTags
} from '../redux/actions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.getValidateTags = this.getValidateTags.bind(this)
  }

  componentDidMount() {
    const {getClipersByQuery} = this.props;
    getClipersByQuery && getClipersByQuery();
    this.initialSearchInput();
  }

  initialSearchInput() {
    const $sliperSearch = $('.cliper_search');
    const sliperSearchTop = $sliperSearch.offset().top;
    const $document = $(document);
    $(window).scroll(() => {
      let currentTop = $document.scrollTop();
      if (currentTop > sliperSearchTop) {
        $sliperSearch.addClass('search_in_top');
      } else {
        $sliperSearch.removeClass('search_in_top');
      }
    });
  }

  getValidateTags() {
    const {tags} = this.props;
    const allTags = [];
    tags.forEach((tagObj) => {
      const {tags} = tagObj;
      tags.forEach((tag) => {
        if (!allTags.some(t => t.value === tag.content)) {
          allTags.push({
            id: tag.objectId,
            value: tag.content
          });
        }
      });
    });
    return allTags;
  }

  handleKeyDown(e) {
    const {getClipersByQuery} = this.props;
    if (e.which === 13) {
      getClipersByQuery();
    }
  }

  handleSearchChange() {
    const search = this.search.value;
    const {changeSearchContent} = this.props;
    changeSearchContent && changeSearchContent(search);
  }

  render() {
    const {loading, search, resetActiveTags} = this.props;
    return (
      <div className="user_component">
        <LoadingModal showModal={loading} />
        <CliperComments />
        <div className="cliper_search">
          <FilterList
            items={this.getValidateTags()}
            onChange={(tags) => {
              resetActiveTags(tags);
            }}
          />
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
            aria-hidden="true"
            onClick={() => {
              getClipersByQuery();
            }}></i>
        </div>
        <Clipers />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {loading, search, tags} = state;
  return {loading, search, tags};
}

function mapDispatchToProps(dispatch) {
  return {
    changeSearchContent: (search) => {
      dispatch(changeSearchContent(search));
    },
    getClipersByQuery: () => {
      dispatch(getClipersByQuery());
    },
    resetActiveTags: (tags) => {
      dispatch(resetActiveTags(tags));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
