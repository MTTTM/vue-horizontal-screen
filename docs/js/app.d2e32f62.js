(function(e){function t(t){for(var n,s,r=t[0],c=t[1],d=t[2],l=0,w=[];l<r.length;l++)s=r[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&w.push(o[s][0]),o[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(w.length)w.shift()();return a.push.apply(a,d||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],n=!0,r=1;r<i.length;r++){var c=i[r];0!==o[c]&&(n=!1)}n&&(a.splice(t--,1),e=s(s.s=i[0]))}return e}var n={},o={app:0},a=[];function s(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=n,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="https://mtttm.github.io/vue-horizontal-screen/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var d=0;d<r.length;d++)t(r[d]);var p=c;a.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"56d7":function(e,t,i){"use strict";i.r(t);var n=i("5530"),o=(i("e260"),i("e6cf"),i("cca6"),i("a79d"),i("7a23")),a={id:"app"},s=Object(o["g"])("a",{href:"/home",class:"home"},"home",-1);function r(e,t,i,n,r,c){var d=Object(o["u"])("router-view");return Object(o["p"])(),Object(o["d"])("div",a,[s,Object(o["g"])(d)])}var c={name:"App",data:function(){return{obj:{width:2001,height:1125,cssVar:"hc-var",times:3,setWrapAttr:!1,AdaptEventName:"",adaptedCallback:"adaptedCallback"},domSwipe:"--",show2:!0}},mounted:function(){window.addEventListener("swipeLeft",this.swipeCallback),window.addEventListener("swipeRight",this.swipeCallback),window.addEventListener("swipeTop",this.swipeCallback),window.addEventListener("swipeBottom",this.swipeCallback)},beforeUnmount:function(){window.removeEventListener("swipeLeft",this.swipeCallback),window.removeEventListener("swipeRight",this.swipeCallback),window.removeEventListener("swipeTop",this.swipeCallback),window.removeEventListener("swipeBottom",this.swipeCallback)},methods:{adaptedCallback:function(e){clearTimeout(window.timer),window.timer=setTimeout((function(){alert("adaptedCallback"),console.log("e",e)}),1e3)},swipeCallback:function(e){e.data.data.type?alert(e.data.data.type):alert("hsAdapt")},reset:function(){},hsSwipe:function(e,t){var i=e.type,n=e.dis;console.log("dom event",e,i,n,t),"swipeLeft"==i&&n>=20?(this.domSwipe="swipeLeft",console.log("swipeLeft")):"swipeRight"==i&&n>=20&&(console.log("swipeRight"),this.domSwipe="swipeRight")}}};i("6115");c.render=r;var d=c,p={key:0};function l(e,t,i,n,a,s){var r=Object(o["u"])("router-link");return Object(o["p"])(),Object(o["d"])("div",null,[Object(o["g"])("ul",null,[(Object(o["p"])(!0),Object(o["d"])(o["a"],null,Object(o["t"])(a.Routes,(function(e){return Object(o["p"])(),Object(o["d"])("div",{key:e.path},["/"!==e.path&&"/home"!==e.path?(Object(o["p"])(),Object(o["d"])("li",p,[Object(o["g"])(r,{to:e.path},{default:Object(o["B"])((function(){return[Object(o["f"])(Object(o["x"])(e.path),1)]})),_:2},1032,["to"])])):Object(o["e"])("",!0)])})),128))])])}var w={data:function(){return{Routes:z}}};w.render=l;var u=w,v={class:"box",ref:"hscreen"},h={id:"wrap"},b=Object(o["g"])("div",{class:"header"},[Object(o["g"])("div",{class:"left"},"25"),Object(o["g"])("div",{class:"mid"},"40"),Object(o["g"])("div",{class:"right"},"50")],-1),f={class:"main"},m={class:"dom-event"},g=Object(o["g"])("p",null,"Horizontal event",-1),O={class:"dom-event-v"},j=Object(o["g"])("p",null,"Vertical event",-1),y=Object(o["g"])("div",{class:"footer"},null,-1);function L(e,t,i,n,a,s){var r=Object(o["v"])("hs-swipe"),c=Object(o["v"])("horizontal-screen");return Object(o["p"])(),Object(o["d"])("div",{id:"app",onClick:t[1]||(t[1]=function(){return s.reset&&s.reset.apply(s,arguments)})},[Object(o["C"])(Object(o["g"])("div",v,[Object(o["g"])("div",h,[b,Object(o["g"])("div",f,[Object(o["C"])(Object(o["g"])("div",m,[g,Object(o["g"])("h3",null,"swipe type:"+Object(o["x"])(a.domSwipe),1)],512),[[r,s.hsSwipe,void 0,{stop:!0,prevent:!0}]]),Object(o["C"])(Object(o["g"])("div",O,[j,Object(o["g"])("h3",null,"swipe type:"+Object(o["x"])(a.domVSwipe),1)],512),[[r,s.hsVSwipe,void 0,{stop:!0,prevent:!0}]])]),y])],512),[[c,a.obj]])])}var k={name:"App",data:function(){return{obj:{width:2001,height:1125,cssVar:"hc-var",times:3,setWrapAttr:!1,AdaptEventName:"",adaptedCallback:"adaptedCallback"},domSwipe:"--",domVSwipe:"--",show2:!0}},mounted:function(){window.addEventListener("swipeLeft",this.swipeCallback),window.addEventListener("swipeRight",this.swipeCallback),window.addEventListener("swipeTop",this.swipeCallback),window.addEventListener("swipeBottom",this.swipeCallback)},beforeUnmount:function(){window.removeEventListener("swipeLeft",this.swipeCallback),window.removeEventListener("swipeRight",this.swipeCallback),window.removeEventListener("swipeTop",this.swipeCallback),window.removeEventListener("swipeBottom",this.swipeCallback)},methods:{adaptedCallback:function(e){clearTimeout(window.timer),window.timer=setTimeout((function(){alert("adaptedCallback"),console.log("e",e)}),1e3)},swipeCallback:function(e){e.data.data.type?alert(e.data.data.type):alert("hsAdapt")},reset:function(){},hsSwipe:function(e,t){var i=e.type,n=e.dis;console.log("dom event",e,i,n,t),"swipeLeft"==i&&n>=20?(this.domSwipe="swipeLeft",console.log("swipeLeft")):"swipeRight"==i&&n>=20&&(console.log("swipeRight"),this.domSwipe="swipeRight")},hsVSwipe:function(e){var t=e.type,i=e.dis;"swipeBottom"==t&&i>=5?(console.log("swipeBottom"),this.domVSwipe="swipeBottom"):"swipeTop"==t&&i>=5&&(console.log("swipeTop"),this.domVSwipe="swipeTop")}}};i("5ecc");k.render=L;var C=k,E={class:"box",ref:"hscreen"},T={id:"wrap"},S=Object(o["g"])("div",{class:"header"},[Object(o["g"])("div",{class:"left"},"25"),Object(o["g"])("div",{class:"mid"},"40"),Object(o["g"])("div",{class:"right"},"50")],-1),A={class:"main"},x={class:"dom-event"},R=Object(o["g"])("p",null,"Horizontal event",-1),V={class:"dom-event-v"},$=Object(o["g"])("p",null,"Vertical event",-1),B=Object(o["g"])("div",{class:"footer"},null,-1);function M(e,t,i,n,a,s){var r=Object(o["v"])("hs-swipe"),c=Object(o["v"])("horizontal-screen");return Object(o["p"])(),Object(o["d"])("div",{id:"app",onClick:t[1]||(t[1]=function(){return s.reset&&s.reset.apply(s,arguments)})},[Object(o["C"])(Object(o["g"])("div",E,[Object(o["g"])("div",T,[S,Object(o["g"])("div",A,[Object(o["C"])(Object(o["g"])("div",x,[R,Object(o["g"])("h3",null,"swipe type:"+Object(o["x"])(a.domSwipe),1)],512),[[r,s.hsSwipe,void 0,{stop:!0,prevent:!0}]]),Object(o["C"])(Object(o["g"])("div",V,[$,Object(o["g"])("h3",null,"swipe type:"+Object(o["x"])(a.domVSwipe),1)],512),[[r,s.hsVSwipe,void 0,{stop:!0,prevent:!0}]])]),B])],512),[[c,a.obj]])])}var W={name:"App",data:function(){return{obj:{width:2001,height:1125,cssVar:"hc-var",times:3,setWrapAttr:!1,rotate:-90,AdaptEventName:"",adaptedCallback:"adaptedCallback"},domSwipe:"--",domVSwipe:"--",show2:!0}},mounted:function(){window.addEventListener("swipeLeft",this.swipeCallback),window.addEventListener("swipeRight",this.swipeCallback),window.addEventListener("swipeTop",this.swipeCallback),window.addEventListener("swipeBottom",this.swipeCallback)},beforeUnmount:function(){window.removeEventListener("swipeLeft",this.swipeCallback),window.removeEventListener("swipeRight",this.swipeCallback),window.removeEventListener("swipeTop",this.swipeCallback),window.removeEventListener("swipeBottom",this.swipeCallback)},methods:{adaptedCallback:function(e){clearTimeout(window.timer),window.timer=setTimeout((function(){alert("adaptedCallback"),console.log("e",e)}),1e3)},swipeCallback:function(e){e.data.data.type?alert(e.data.data.type):alert("hsAdapt")},reset:function(){},hsSwipe:function(e,t){var i=e.type,n=e.dis;console.log("dom event",e,i,n,t),"swipeLeft"==i&&n>=20?(this.domSwipe="swipeLeft",console.log("swipeLeft")):"swipeRight"==i&&n>=20&&(console.log("swipeRight"),this.domSwipe="swipeRight")},hsVSwipe:function(e){var t=e.type,i=e.dis;"swipeBottom"==t&&i>=5?(console.log("swipeBottom"),this.domVSwipe="swipeBottom"):"swipeTop"==t&&i>=5&&(console.log("swipeTop"),this.domVSwipe="swipeTop")}}};i("fa87");W.render=M;var X=W,z=[{path:"/",redirect:"/home"},{path:"/home",component:u,title:"home"},{path:"/Clockwise",component:C,title:"Clockwise"},{path:"/Counterclockwise",component:X,title:"Counterclockwise"}],H=i("6c02"),P=Object(H["a"])({history:Object(H["b"])(),routes:z}),Y=P,N=(i("a9e3"),function(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;return e>t?1:0}),_=function(){var e=navigator.userAgent.toLowerCase(),t="ontouchstart"in window&&"ontouchstart"in document;return!(!/mobile/i.test(e)&&!t)},U=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e.data={data:t},i?1==i.nodeType&&"function"==typeof i["dispatchEvent"]&&i["dispatchEvent"](e):window.dispatchEvent(e)};function q(e){return[90,-90].indexOf(e)>-1?e:90}function J(e){var t=document.createEvent("HTMLEvents");return t.initEvent(e,!1,!0),t}function D(e){var t;return t=e.touches?e.targetTouches[0]:e||window.event,t}function F(e,t){e&&e.$prevent&&t.preventDefault()}function G(e,t){e&&e.$stop&&t.stopPropagation()}function I(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return function(i){G(t,i),F(t,i);var n=D(i);e.startX=n.clientX,e.startY=n.clientY,e.disX=0,e.disY=0,e.disc=e.distance}}function K(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return function(i){G(t,i),F(t,i);var n=D(i),o=n.clientX,a=n.clientY;e.disX=o-e.startX,e.disY=a-e.startY}}function Q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0,s={win:function(e,t){console.log("触发事件",e),i[e]&&i[e]instanceof Event?U(i[e],t):console.error("events [".concat(e,"] of window is no reigstered"))},doms:function(e,t){o(t,a)}},r=function(t,i){var n=i.disY,o=i.disX,a=i.rotate,r=i.isHsAdapetAndMobile,c="swipeLeft"==t||"swipeRight"==t,d=0;d=c?r?Math.abs(n):Math.abs(o):r?Math.abs(o):Math.abs(n),s[e](t,{dis:d,type:t,rotate:a})};return function(e){G(a,e),F(a,e);var i=t.disY,o=t.distance,s=t.disX,c=t.rotate,d=N(),p=Object(n["a"])(Object(n["a"])({},t),{},{isHsAdapetAndMobile:1!==d&&_()});if(1!=d&&_()){var l="";i<0&&i<Number(-o)?l=90===c?"swipeLeft":"swipeRight":i>0&&i>o&&(l=90===c?"swipeRight":"swipeLeft"),l&&r(l,p);var w="";s<0&&s<Number(-o)?w=90===c?"swipeBottom":"swipeTop":s>0&&s>o&&(w=90===c?"swipeTop":"swipeBottom"),w&&r(w,p)}else i<0&&i<Number(-o)?r("swipeTop",p):i>0&&i>o&&r("swipeBottom",p),s<0&&s<Number(-o)?r("swipeLeft",p):s>0&&s>o&&r("swipeRight",p)}}function Z(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,i=e.oneTimesWidth,n=e.oneTimesHeight,o=e.cssVar,a=e.setWrapAttr,s=e.adaptEvent,r=e.adaptedCallback,c=e.el,d=e.binding,p=e.vnode,l=e.rotate,w=window.innerWidth,u=window.innerHeight,v=w>u?w:u,h=v/i,b=!_(),f=d.instance?d.instance:p.context;c.$hsAdapted=!1,1==N()||b?h*n>u&&(h=u/n):h*n>w&&(h=w/n),document.querySelector("html").style.setProperty("--".concat(o),h),null!=window.orientation&&180!==window.orientation&&0!==window.orientation||b?(90===window.orientation||-90===window.orientation||b)&&(c.style.webkitTransform=c.style.transform="rotate(0)",a&&(c.style.width="".concat(w,"px"),c.style.height="".concat(u,"px"))):(c.style.webkitTransform=c.style.transform="rotate(".concat(l,"deg)"),90==l?c.style.webkitTransformOrigin=c.style.transformOrigin="".concat(w/2,"px center"):-90==l&&(c.style.webkitTransformOrigin=c.style.transformOrigin=" center ".concat(u/2,"px")),a&&(c.style.width="".concat(u,"px"),c.style.height="".concat(w,"px"))),c.$hsAdapted=!0,!1!==t&&(U(s,c.$hsAdapted),"function"===typeof r?r(c,!0):f&&"function"===typeof f[r]&&f[r](c,!0))}function ee(e,t,i){var n=t.value,o=n.cssVar,a=n.width,s=n.height,r=n.times,c=n.triggerTime,d=n.AdaptEventName,p=n.setWrapAttr,l=n.adaptedCallback,w=n.rotate;w=q(w),r||(r=1,console.warn("times is required!!"));var u=a/r,v=s/r;o||(o="hs-var"),d||(d="hsAdapt"),c||(c=1e3);var h="setWrapAttr"in t.value;h||(p=!0);var b,f=J(d),m={oneTimesWidth:u,oneTimesHeight:v,el:e,cssVar:o,setWrapAttr:p,adaptEvent:f,adaptedCallback:l,binding:t,vnode:i,rotate:w};e.$hsLayout=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Z(m,e)},e.$delayLayout=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];clearTimeout(b),b=setTimeout((function(){return Z(m,e)}),c)},e.$hsAdapted=!1,e.$hsLayout(!1),"onorientationchange"in window?(window.removeEventListener("orientationchange",e.$delayLayout),window.addEventListener("orientationchange",e.$delayLayout,!1)):(window.removeEventListener("resize",e.$hsLayout),window.addEventListener("resize",e.$hsLayout,!1))}function te(e){window.removeEventListener("resize",e.$hsLayout),window.removeEventListener("orientationchange",e.$delayLayout),e.$hsLayout=null}function ie(e,t){var i=t.value,n=t.modifiers,o=n.stop,a=n.prevent,s=n.clockwise,r=n.counterclockwise,c=90;r?c=-90:s&&(c=90);var d={startX:0,startY:0,disX:0,distance:1,rotate:c};e.$stop=o,e.$prevent=a;var p=I(d,e),l=K(d,e),w=Q("doms",d,{},i,e);_()?(e.addEventListener("touchstart",p,!1),e.addEventListener("touchmove",l,!1),e.addEventListener("touchend",w,!1)):(e.addEventListener("mousedown",p,!1),e.addEventListener("mousemove",l,!1),e.addEventListener("mouseup",w,!1))}var ne={bind:ee,unbind:te,beforeMount:ee,unmounted:te},oe={bind:ie,beforeMount:ie},ae=Object(o["c"])(d);ae.directive("horizontal-screen",Object(n["a"])({},ne)),ae.directive("hs-swipe",Object(n["a"])({},oe)),ae.use(Y),ae.mount("#app")},"5ecc":function(e,t,i){"use strict";i("dc82")},6115:function(e,t,i){"use strict";i("8923")},"72ab":function(e,t,i){},8923:function(e,t,i){},dc82:function(e,t,i){},fa87:function(e,t,i){"use strict";i("72ab")}});
//# sourceMappingURL=app.d2e32f62.js.map