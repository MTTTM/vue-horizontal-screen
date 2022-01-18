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
import { directive } from "../../index.js";
import { ThemeContext } from "./ThemeContext.js"
export default class HorizontalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {}
  }
  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.rotate) {
      directive.unbind(this.myRef.current);
      directive.bind(this.myRef.current, nextProps);
      return true;
    }
    return false;
  }

  componentDidMount() {
    directive.bind(this.myRef.current, this.props);
  }
  componentWillUnmount() {
    directive.unbind(this.myRef.current);
  }
  render() {
    let { adaptedCallback, attrs, ...params } = this.props;
    return (
      <ThemeContext.Provider value={this.props.rotate}>
        <div ref={this.myRef}  {...params}>{this.props.children}</div>
      </ThemeContext.Provider>
    )
  }
};
HorizontalScreen.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cssvar: PropTypes.string.isRequired,
  times: PropTypes.number.isRequired,
  triggerTime: PropTypes.number,
  AdaptEventName: PropTypes.string,
  setWrapAttr: PropTypes.bool,
  rotate: PropTypes.oneOf([90, -90]),
  adaptedCallback: PropTypes.func,
}