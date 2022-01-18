
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
import { ThemeContext } from "./ThemeContext.js"
export default class SwipeWrap extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    directiveForDom.bind(this.myRef.current, { rotate: this.context, ...this.props });
  }
  componentWillUnmount() {
    directiveForDom.unbind(this.myRef.current);
  }
  UNSAFE_componentWillUpdate() {
    if (this.context) {
      directiveForDom.unbind(this.myRef.current);
      directiveForDom.bind(this.myRef.current, { rotate: this.context, ...this.props });
      return true;
    }
    return false;
  }
  render() {
    let { stop, prevent, swipeCallBack, ...params } = this.props;
    return (
      //rotate从父级获取，不接受外部传入
      <div ref={this.myRef}  {...params} >{this.props.children}</div>
    )
  }
};
SwipeWrap.propTypes = {
  stop: PropTypes.bool,
  prevent: PropTypes.bool,
  swipeCallBack: PropTypes.func
}