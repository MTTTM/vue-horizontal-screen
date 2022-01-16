import React from 'react';
import { HorizontalScreen, SwipeWrap, event } from "./src/index.js"
// import {HorizontalScreen,SwipeWrap,event} from "react-horizontal-screen"
// import {HorizontalScreen,SwipeWrap,event} from "react-xx"
event();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hsObj: {
        width: 2001,
        height: 1125,
        cssVar: "hc-var",
        times: 3
      },
      domSwipeText: "",
      domSwipeText2: "",
    };
    this.myRef = React.createRef();
  }
  swipeCallBack(data, el) {
    let { type, dis } = data;
    console.log("dom event", data, type, dis, el);
    if (type === "swipeLeft" && dis >= 20) {
      this.setState({ "domSwipeText": "swipeLeft" })
      console.log("swipeLeft");
    } else if (type === "swipeRight" && dis >= 20) {
      console.log("swipeRight");
      this.setState({ "domSwipeText": "swipeRight" })
    }
  }
  swipeCallBack2(data, el) {
    let { type, dis } = data;
    console.log("dom event", data, type, dis, el);

    if (type == "swipeBottom" && dis >= 5) {
      console.log("swipeBottom");
      this.setState({ "domSwipeText2": "swipeBottom" })
    } else if (type == "swipeTop" && dis >= 5) {
      this.setState({ "domSwipeText2": "swipeTip" })
    }
  }
  swipeCallback(obj) {
    if (obj.data.data.type) {
      alert(obj.data.data.type);
    } else {
      clearTimeout(window.hsAdaptTimer);
      window.hsAdaptTimer = setTimeout(() => {
        alert('hsAdapt');
      }, 1000)
    }
  }
  adaptedCallback() {
    clearTimeout(window.hsAdaptTimer);
    window.hsAdaptTimer = setTimeout(() => {
      alert('hsAdapt');
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <HorizontalScreen
          attrs={this.state.hsObj}
          adaptedCallback={this.adaptedCallback}
          className="box">
          <div id="wrap">
            <div className="header">
              <div className="left">25</div>
              <div className="mid">40</div>
              <div className="right">50</div>
            </div>
            <div className="main">
              <SwipeWrap
                swipeCallBack={(data, el) => this.swipeCallBack(data, el)}
                stop={true}
                prevent={true}
                className="dom-event">
                <div className="dom-event">
                  <p>Horizontal sliding area.</p>
                  <h3>swipe type:{this.state.domSwipeText}</h3>
                </div>
              </SwipeWrap>

              <SwipeWrap
                swipeCallBack={(data, el) => this.swipeCallBack2(data, el)}
                stop={true}
                prevent={true}
                className="dom-event">
                <div className="dom-event2">
                  <p>Vertical sliding area.</p>
                  <h3>swipe type:{this.state.domSwipeText2}</h3>
                </div>
              </SwipeWrap>
            </div>
            <div className="footer"></div>
          </div>

        </HorizontalScreen>
      </div>
    );
  }

}


