import React from 'react';
import {connect} from 'react-redux';

class Cliper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cliper_container">
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   const {clipers} = state;
//   return {
//     clipers
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//
// }

export default Cliper;
// export default connect(mapStateToProps, mapDispatchToProps)(Cliper)
