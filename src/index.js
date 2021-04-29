// +----------------------------------------------------------------------
// | vue-horizontal-screen
// +----------------------------------------------------------------------
// | Copyright (c) 2021 MTTTM  https://github.com/MTTTM/vue-horizontal-screen All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/MTTTM/vue-horizontal-screen/blob/main/LICENSE)
// +----------------------------------------------------------------------
// | Author: MTTTM 
// +----------------------------------------------------------------------
/**
 * @returns {Number} 1=>横屏 0=>竖屏
 */
export const getDir = () => {
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    if (clientWidth > clientHeight) {
        return 1;
    }
    else {
        return 0;
    }
}
/**
 * @description isImmersiveNav
 */
export const isImmersive=()=>{
    let wHeight=window.innerHeight;
    let dHeight=document.documentElement.clientHeight;
    return wHeight>dHeight;
}
export const isMobile = () => {
    let ua = navigator.userAgent.toLowerCase();
    let canTouch = "ontouchstart" in window && "ontouchstart" in document
    if (/mobile/i.test(ua) || canTouch) {
        return true;
    }
    else {
        return false;
    }
}
/**
 *  派发自定义事件
 * @param {Event} event 
 * @param {*} data 
 * @param {Null or Document} target 
 */
const dispatch = function (event, data,target=null) {
    event.data = {
        data
    };
    if(!target){
        window.dispatchEvent(event);
    }
    else if(target.nodeType==1&&typeof target['dispatchEvent']=="function"){
        target['dispatchEvent'](event);
    }
}
/**
 * 注册事件，并且返回
 * @param {String} eventName 
 * @returns {Event}
 */
 function createEvent(eventName){
    let e = document.createEvent('HTMLEvents');
    e.initEvent(eventName, false, true);
    return  e;
}
//事件兼容处理
function eventFix(event){
    var touch;
    if(event.touches) {
        touch = event.targetTouches[0];
    } else {
        touch = event||window.event;
    }
    return touch;
}
//阻止默认事件
function preventDefault(el,ev){
    if(el&&el.$prevent){
        ev.preventDefault();
    }
}
//阻止事件传播
function stopPropagation(el,ev){
    if(el&&el.$stop){
        ev.stopPropagation();
     }
}
/**
 * 鼠标按下
 * @param {*} obj 
 * @returns {Function}
 */
function fnStartParams(obj={},el){
    return function(ev){
        stopPropagation(el,ev);
        preventDefault(el,ev);
         var touch=eventFix(ev);
         obj.startX = touch.clientX;
         obj.startY = touch.clientY;
         obj.disX = 0;
         obj.disY = 0;
         obj.disc = obj.distance;
    }
 }
/**
 *鼠标移动
 * @param {*} obj 
 * @returns {Function}
 */
 function fnMoveParams(obj={},el){
     return function(ev){
        stopPropagation(el,ev);
        preventDefault(el,ev);
         var touch=eventFix(ev);
         let curX = touch.clientX;
         let curY = touch.clientY;
         obj.disX = curX - obj.startX;
         obj.disY = curY - obj.startY;
     }
 }
 //鼠标放开
 /**
  * 
  * @param {String} callbackType 
  * @param {Object} baseInfo 
  * @param {Object<Event>} eventMaps 
  * @param {Function} callback  dom的自定义事件回调函数
  * @param {Document} el  dom
  * @returns 
  */
 function fnEndParams(callbackType="",baseInfo={},eventMaps={},callback,el){
     let swipes={
         win:function(swipeName,data){
             if(eventMaps[swipeName]&&eventMaps[swipeName]instanceof Event){
                 dispatch(eventMaps[swipeName], data);
             }
             else{
                 console.error(`events [${swipeName}] of window is no reigstered`);
             }
         },
         doms:function(swipeName,data){
            callback(data,el);
         },
     }
     return function(ev){
        stopPropagation(el,ev);
        preventDefault(el,ev);
         let dir = getDir();//1=>横屏 0=>竖屏
         let {disY,disc,disX}=baseInfo;
         if (dir == 1||!isMobile()) {
             if (disY < 0 && disY < Number(-disc)) {
                swipes[callbackType]("swipeTop",{ dis: Math.abs(disY),type:"swipeTop" });
             }
             else if (disY > 0 && disY > disc) {
                swipes[callbackType]("swipeBottom", { dis: Math.abs(disY),type:"swipeBottom"});
             }
             if (disX < 0 && disX < Number(-disc)) {
                swipes[callbackType]("swipeLeft", { dis: Math.abs(disX),type:"swipeLeft" });
             }
             else if (disX > 0 && disX > disc) {
                swipes[callbackType]("swipeRight", { dis: Math.abs(disX),type:"swipeRight" });
             }
 
         } else {
             //设备竖屏
             if (disY < 0 && disY < Number(-disc)) {
                 swipes[callbackType]("swipeLeft",{ dis: Math.abs(disY),type:"swipeLeft" });
             }
             else if (disY > 0 && disY > disc) {
                 swipes[callbackType]("swipeRight",{ dis: Math.abs(disY),type:"swipeRight" });
             }
             if (disX < 0 && disX < Number(-disc)) {
                 swipes[callbackType]("swipeBottom",{ dis: Math.abs(disX),type:"swipeBottom" });
             }
             else if (disX > 0 && disX > disc) {
                swipes[callbackType]("swipeTop",{ dis: Math.abs(disX),type:"swipeTop" });
             }
         }
     }
 }
/**
 * 界面适配
 * @param {*} obj 
 */
function hsLayoutFunc(obj={}) {
    let {oneTimesWidth,oneTimesHeight,el,cssVar,setWrapAttr,adaptEvent}=obj;
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    let maxWidth = clientWidth > clientHeight ? clientWidth : clientHeight;
    let percent = maxWidth / oneTimesWidth;
    let isPc = !isMobile();
    //如果按照宽度比例缩放后，布局高度比设备高度大，那就用高度来做比例
    if (getDir() == 1 || isPc) {
        if (percent * oneTimesHeight > clientHeight) {
            percent = clientHeight / oneTimesHeight;
        }
    }
    else {
        if (percent * oneTimesHeight > clientWidth) {
            percent = clientWidth / oneTimesHeight;
        }
    }
    document.querySelector('html').style.setProperty(`--${cssVar}`, percent);
    //在竖屏状态我们通过添加transform:rotate(90deg)，来让这个页面横过来
    if ( (window.orientation == null 
        || window.orientation === 180 
        || window.orientation === 0
        )&&!isPc) {//竖屏状态
        el.style.webkitTransform = el.style.transform = `rotate(90deg)`;
        el.style.webkitTransformOrigin = el.style.transformOrigin = `${clientWidth / 2}px center`;
        if(setWrapAttr){
            el.style.width = `${clientHeight}px`;
           el.style.height = `${clientWidth}px`;
        }
        //如果已经处于横屏状态就不做其他处理了
    } else if ((window.orientation === 90 ||window.orientation === -90)||isPc) {//横屏状态||pc
        el.style.webkitTransform = el.style.transform = `rotate(0)`;
        if(setWrapAttr){
            el.style.width = `${clientWidth}px`;
            el.style.height = `${clientHeight}px`;
        }
    }
    
    el.$hsAdapted = true;//已适配
    dispatch(adaptEvent, el.$hsAdapted);
}
 function directiveBindfunction (el, binding) {
    let { cssVar,width,height,times,triggerTime,AdaptEventName,setWrapAttr} = binding.value;
    if (!times) {
        times = 1;
        console.warn("times is required!!");
    }
    let oneTimesWidth = width / times;
    let oneTimesHeight = height / times;
    if (!cssVar) {
        cssVar = "hs-var";
    }
    if (!AdaptEventName) {
        AdaptEventName = "hsAdapt";
    }
    if(!triggerTime){
        triggerTime=1000;
    }
    let bool='setWrapAttr' in binding.value;
    if(!bool){
        setWrapAttr=true;
    }
    let adaptEvent=createEvent(AdaptEventName);
    var baseInfo={oneTimesWidth,oneTimesHeight,el,cssVar,setWrapAttr,adaptEvent};
    let timer;
    el.$hsLayout = ()=>{hsLayoutFunc(baseInfo)};
    el.$delayLayout = function () {
        clearTimeout(timer);
        timer = setTimeout(() =>hsLayoutFunc(baseInfo), triggerTime);
    };
    el.$hsAdapted = false;
    el.$hsLayout();
    if ("onorientationchange" in window) {
        window.removeEventListener('orientationchange',el.$delayLayout);
        window.addEventListener('orientationchange',el.$delayLayout, false);
    }
    else{
        window.removeEventListener('resize',  el.$hsLayout);
        window.addEventListener('resize',  el.$hsLayout, false);
    }
}
function directiveUnBind(el) {
    /**这谷歌浏览器调试监听工具有bug，如果销毁了一个绑定适配指令的节点，但是看到监听器没有解除，可以关掉调试面板再打开调试面板就可以看到了*/
    window.removeEventListener('resize',  el.$hsLayout);
    window.removeEventListener('orientationchange',el.$delayLayout);
    el.$hsLayout = null;
}
function directiveForDomfunction (el, binding) {
    let callback= binding.value;
    let {stop,prevent}=binding.modifiers;
    let baseInfo={
        startX:0,
        startY:0,
        disX:0,
        distance:1
    }
    el.$stop=stop;
    el.$prevent=prevent;
    //标记事件
    let startFn=fnStartParams(baseInfo,el);
    let moveFn=fnMoveParams(baseInfo,el);
    let endFn=fnEndParams('doms',baseInfo,{},callback,el);
    if (isMobile()) {
        el.addEventListener("touchstart",startFn, false);
        el.addEventListener('touchmove', moveFn, false);
        el.addEventListener('touchend', endFn, false);
    }
    else {
        el.addEventListener("mousedown",startFn,false )
        el.addEventListener("mousemove", moveFn, false);
        el.addEventListener("mouseup", endFn, false);
    }
}

export const directive = {
    bind: directiveBindfunction,
    unbind:directiveUnBind,
    beforeMount: directiveBindfunction,//v3
    unmounted:directiveUnBind//v3
}
export const directiveForDom = {
    bind: directiveForDomfunction,
    beforeMount: directiveForDomfunction,//v3

}
let eventInited=false;
/**
 * 
 * @param {Object} obj
 * @description pre  事件前缀，默认为空
 * @description distance  事件距离，默认50
 */
export const event = (obj = { distance: 50, pre: '' }) => {
    if(eventInited){return;}
    let { pre, distance } = obj;
    let baseInfo={
        startX:0,
        startY:0,
        disX:0,
        distance
    }
    //标记事件
    let swipeLeft = createEvent(`${pre}swipeLeft`);
    let swipeRight = createEvent(`${pre}swipeRight`);
    let swipeTop = createEvent(`${pre}swipeTop`);
    let swipeBottom = createEvent(`${pre}swipeBottom`);
    let eventMaps={swipeLeft,swipeRight,swipeTop,swipeBottom};
    if (isMobile()) {
        window.addEventListener("touchstart",fnStartParams(baseInfo), false);
        window.addEventListener('touchmove', fnMoveParams(baseInfo), false);
        window.addEventListener('touchend', fnEndParams('win',baseInfo,eventMaps), false);
    }
    else {
        window.addEventListener("mousedown",fnStartParams(baseInfo),false )
        window.addEventListener("mousemove", fnMoveParams(baseInfo), false);
        window.addEventListener("mouseup", fnEndParams('win',baseInfo,eventMaps), false);
    }
    eventInited=true;
}

