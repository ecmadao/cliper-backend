import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Cliper from './Cliper/index';
import {
  TABS,
  formatClipers
} from '../ConstValue';
import {
  handleTabChange
} from '../redux/actions';

class Clipers extends React.Component {
  constructor(props) {
    super(props);
  }

  renderClipers() {
    const {clipers} = this.props;
    return clipers.map((cliper, index) => {
      return (
        <Cliper cliper={cliper} key={index}/>
      )
    });
  }

  renderTabs() {
    const {handleTabChange, avtiveTab} = this.props;
    return Object.keys(TABS).map((tab, index) => {
      const tabClass = classNames('cliper_tab', {
        'active': avtiveTab === index
      });
      return (
        <div
          key={index}
          className={tabClass}
          onClick={() => {
            handleTabChange(index)
          }}>{TABS[tab]}</div>
      )
    });
  }

  render() {
    return (
      <div className="clipers_container">
        <div className="cliper_tabs">
          {this.renderTabs()}
        </div>
        <div className="clipers_wrapper">
          {this.renderClipers()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {clipers, avtiveTab} = state;
  return {
    clipers: formatClipers(clipers),
    avtiveTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleTabChange: (index) => {
      dispatch(handleTabChange(index));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clipers)
