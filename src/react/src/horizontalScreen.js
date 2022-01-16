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
export default class HorizontalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
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
      <div ref={this.myRef}  {...params}>{this.props.children}</div>
    )
  }
};
HorizontalScreen.propTypes = {
  attrs: PropTypes.exact({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cssVar: PropTypes.string.isRequired,
    times: PropTypes.number.isRequired,
    triggerTime: PropTypes.number,
    AdaptEventName: PropTypes.string,
    setWrapAttr: PropTypes.bool,
  }),
  adaptedCallback: PropTypes.func,
}