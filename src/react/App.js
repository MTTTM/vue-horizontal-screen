import React from 'react';
// import { HorizontalScreen, SwipeWrap, event } from "./src/index.js"
import { HorizontalScreen, SwipeWrap, event } from "../../dist/react.horizontalScreen.es"
// import {HorizontalScreen,SwipeWrap,event} from "react-horizontal-screen"
// import {HorizontalScreen,SwipeWrap,event} from "react-xx"
// event();
console.log("HorizontalScreen", HorizontalScreen)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hsObj: {
        width: 2001,
        height: 1125,
        cssvar: "hs-var",
        times: 3,
        rotate: 90
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
    console.log("dom   event", data, type, dis, el);

    if (type == "swipeBottom" && dis >= 5) {
      console.log("swipeBottom");
      this.setState({ "domSwipeText2": "swipeBottom" })
    } else if (type == "swipeTop" && dis >= 5) {
      this.setState({ "domSwipeText2": "swipeTop" })
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
  changeRoate() {
    let rotate = this.state.hsObj.rotate == 90 ? -90 : 90;
    this.setState({
      "hsObj": {
        width: 2001,
        height: 1125,
        cssvar: "hs-var",
        times: 3,
        rotate: rotate
      }
    })
  }

  render() {
    return (
      <div className="App">
        <HorizontalScreen
          {...this.state.hsObj}
          adaptedCallback={this.adaptedCallback}
          className="box">
          <div id="wrap">
            <div className="header">
              <div className="left">25</div>
              <div className="mid">
                <span onClick={() => this.changeRoate()}>CLICK ME!current route {this.state.hsObj.rotate}</span>
              </div>
              <div className="right">50</div>
            </div>
            <div className="main">
              <SwipeWrap
                swipeCallback={(data, el) => this.swipeCallBack(data, el)}
                stop={true}
                prevent={true}
                className="dom-event">
                <div className="dom-event">
                  <p>Horizontal sliding area.</p>
                  <h3>swipe type:{this.state.domSwipeText}</h3>
                </div>
              </SwipeWrap>

              <SwipeWrap
                swipeCallback={(data, el) => this.swipeCallBack2(data, el)}
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


