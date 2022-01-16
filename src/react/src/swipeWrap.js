
// +----------------------------------------------------------------------
// | react-horizontal-screen
// +----------------------------------------------------------------------
// | Copyright (c) 2021 MTTTM  https://github.com/MTTTM/react-horizontal-screen All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/MTTTM/react-horizontal-screen/blob/main/LICENSE)
// +----------------------------------------------------------------------
// | Author: MTTTM 
// +----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { directiveForDom } from "../../index.js";
export default class SwipeWrap extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    directiveForDom.bind(this.myRef.current, this.props);
  }
  render() {
    let { stop, prevent, swipeCallBack, ...params } = this.props;
    return (
      <div ref={this.myRef}  {...params}>{this.props.children}</div>
    )
  }
};
SwipeWrap.propTypes = {
  stop: PropTypes.bool,
  prevent: PropTypes.bool,
  swipeCallBack: PropTypes.func
}