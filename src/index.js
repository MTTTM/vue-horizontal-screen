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
 * @param {Window or Document} target 
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
/**
 * 注册事件，并且返回
 * @param {*} eventName 
 * @returns 
 */
function createEvent(eventName){
    let e = document.createEvent('HTMLEvents');
    e.initEvent(eventName, false, true);
    return  e;
}
//鼠标点下
function fnStartParams(obj={}){
    return function(ev){
         var touch=eventFix(ev);
         obj.startX = touch.clientX;
         obj.startY = touch.clientY;
         obj.disX = 0;
         obj.disY = 0;
         obj.disc = obj.distance;
    }
 }
 //鼠标移动
 function fnMoveParams(obj={}){
     return function(ev){
         var touch=eventFix(ev);
         let curX = touch.clientX;
         let curY = touch.clientY;
         obj.disX = curX - obj.startX;
         obj.disY = curY - obj.startY;
     }
 }
 //鼠标放开
 function fnEndParams(callbackType="",baseInfo={},eventMaps={}){
     let swipes={
         win:function(swipeName,data){
             if(eventMaps[swipeName]&&eventMaps[swipeName]instanceof Event){
                 dispatch(eventMaps[swipeName], data);
             }
             else{
                 console.error(`events ${swipeName} of window is no reigstered`);
             }
         },
         doms:function(swipeName,data){
             if(eventMaps[swipeName]&&eventMaps[swipeName]instanceof Event){
                 dispatch(eventMaps[swipeName], data);
             }
             else{
                 console.error(`events ${swipeName} of dom is no reigstered`);
             }
         },
     }
     return function(){
         let dir = getDir();//1=>横屏 0=>竖屏
         let {disY,disc,disX}=baseInfo;
         if (dir == 1||!isMobile()) {
             if (disY < 0 && disY < Number(-disc)) {
                // dispatch(swipeTop, { dis: Math.abs(disY) });
                swipes[callbackType]("swipeTop",{ dis: Math.abs(disY) });
             }
             else if (disY > 0 && disY > disc) {
                // dispatch(swipeBottom, { dis: Math.abs(disY) });
                swipes[callbackType]("swipeBottom", { dis: Math.abs(disY)});
             }
             if (disX < 0 && disX < Number(-disc)) {
                // dispatch(swipeLeft, { dis: Math.abs(disX) });
                swipes[callbackType]("swipeLeft", { dis: Math.abs(disX) });
             }
             else if (disX > 0 && disX > disc) {
                // dispatch(swipeRight, { dis: Math.abs(disX) });
                swipes[callbackType]("swipeRight", { dis: Math.abs(disX) });
             }
 
         } else {
             //设备竖屏
             if (disY < 0 && disY < Number(-disc)) {
                // dispatch(swipeLeft, { dis: Math.abs(disY) });
                 swipes[callbackType]("swipeLeft",{ dis: Math.abs(disY) });
             }
             else if (disY > 0 && disY > disc) {
                // dispatch(swipeRight, { dis: Math.abs(disY) });
                 swipes[callbackType]("swipeRight",{ dis: Math.abs(disY) });
             }
             if (disX < 0 && disX < Number(-disc)) {
                 //dispatch(swipeBottom, { dis: Math.abs(disX) });
                 swipes[callbackType]("swipeBottom",{ dis: Math.abs(disX) });
             }
             else if (disX > 0 && disX > disc) {
                // dispatch(swipeTop, { dis: Math.abs(disX) });
                swipes[callbackType]("swipeTop",{ dis: Math.abs(disX) });
             }
         }
     }
 }
export const directive = {
    bind: function (el, binding) {
        let { cssVar,
            width,
            height,
            times,
            triggerTime,
            AdaptEventName
        } = binding.value;
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
        el.$adaptEvent=createEvent(AdaptEventName);
        let eventFunc = function () {
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
                el.style.width = `${clientHeight}px`;
                el.style.height = `${clientWidth}px`;
                el.style.webkitTransformOrigin = el.style.transformOrigin = `${clientWidth / 2}px center`;
                //如果已经处于横屏状态就不做其他处理了
            } else if ((window.orientation === 90 ||window.orientation === -90)||isPc) {//横屏状态||pc
                el.style.webkitTransform = el.style.transform = `rotate(0)`;
                el.style.width = `${clientWidth}px`;
                el.style.height = `${clientHeight}px`;
            }
            
            el.$hsAdapted = true;//已适配
            dispatch(el.$adaptEvent, el.$hsAdapted);
        }
        let timer;
        let eventFunTime = function () {
            clearTimeout(timer);
            timer = setTimeout(() => {
                eventFunc();
            }, triggerTime);
        }
        el.$hsLayout = eventFunc;
        el.$hsAdapted = false;
        el.fn = eventFunTime;
        eventFunc();
        if ("onorientationchange" in window) {
            window.removeEventListener('orientationchange', el.fn);
            window.addEventListener('orientationchange', el.fn, false);
        }
        else{
            window.removeEventListener('resize', eventFunc);
            window.addEventListener('resize', eventFunc, false);
        }
    },
    unbind(el) {
        window.removeEventListener('resize', el.fn, false);
        window.removeEventListener('orientationchange', el.fn, false);
        el.$hsLayout = null;
    }
}
/**
 * 
 * @param {Object} obj
 * @description pre  事件前缀，默认为空
 * @description distance  事件距离，默认50
 */
export const event = (obj = { distance: 50, pre: '' }) => {
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
}

