import React from 'react';
import iconImage from '../../../images/cliper.png';

class EmptyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="empty_wrapper">
        <div className="empty_container">
          <div className="empty_icon"></div><br/>
          <span>还没有储存的信息呢</span><br/><br/>
          <a href="https://chrome.google.com/webstore/detail/biijehenaabpogldekblkfgooifmagbi/publish-accepted" target="_blank">戳我可以下载 chrome 插件</a>
        </div>
      </div>
    )
  }
}

export default EmptyComponent;
