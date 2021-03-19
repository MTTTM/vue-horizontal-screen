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
// 派发自定义事件
const dispatch = function (event, data) {
    event.data = {
        data
    };
    window.dispatchEvent(event);
}
/**
 * 
 * @param {*} AdaptEventName addEventLister name
 * @param {*} el  dom
 */
const AdaptEvent = function (AdaptEventName, el) {
    el.$adaptEvent = document.createEvent('HTMLEvents');
    el.$adaptEvent.initEvent(AdaptEventName, false, true);
}
export const directive = {
    bind: function (el, binding) {
        
        let { cssVar,
            width,
            height,
            times,
            disabledresized,
            AdaptEventName
        } = binding.value;
        let oneTimesWidth = width / times;
        let oneTimesHeight = height / times;
        if (!cssVar) {
            cssVar = "hs-var";
        }
        if (!times) {
            times = 3;
        }
        if (!AdaptEventName) {
            AdaptEventName = "hsAdapt";
        }
        AdaptEvent(AdaptEventName, el);
        let eventFunc = function () {
            let clientWidth = window.innerWidth||document.documentElement.clientWidth;
            let clientHeight = window.innerHeight||document.documentElement.clientHeight;
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
            if (!isPc) {
                //在竖屏状态我们通过添加transform:rotate(90deg)，来让这个页面横过来
                if (window.orientation == null || window.orientation === 180 || window.orientation === 0) {//竖屏状态
                    el.style.webkitTransform = el.style.transform = `rotate(90deg)`;
                    el.style.width = `${clientHeight}px`;
                    el.style.height = `${clientWidth}px`;
                    el.style.webkitTransformOrigin = el.style.transformOrigin = `${clientWidth / 2}px center`;
                    //如果已经处于横屏状态就不做其他处理了
                } else if (window.orientation === 90 || window.orientation === -90) {//横屏状态
                    el.style.webkitTransform = el.style.transform = `rotate(0)`;
                    el.style.width = `${clientWidth}px`;
                    el.style.height = `${clientHeight}px`;
                }
            }
            else {
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
            }, 500);
        }
        el.$hsLayout = eventFunc;
        el.$hsAdapted = false;//已适配，disabledresized为false时候能用上
        el.fn = eventFunTime;
        el.fn();
        window.addEventListener('resize', () => {
            el.$hsAdapted = false;
            dispatch(el.$adaptEvent, el.$hsAdapted);
        }, false);
        if ("onorientationchange" in window) {
            window.removeEventListener('orientationchange', el.fn);
            window.addEventListener('orientationchange', el.fn, false);
        }
        if (!disabledresized) {
            window.removeEventListener('resize', el.fn);
            window.addEventListener('resize', el.fn, false);
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
    let startX = 0;
    let startY = 0;
    let disX = 0;
    let disY = 0;
    let disc = distance;
    //标记事件
    let swipeLeft = document.createEvent('HTMLEvents');
    swipeLeft.initEvent(`${pre}swipeLeft`, false, true);
    let swipeRight = document.createEvent('HTMLEvents');
    swipeRight.initEvent(`${pre}swipeRight`, false, true);
    let swipeTop = document.createEvent('HTMLEvents');
    swipeTop.initEvent(`${pre}swipeTop`, false, true);
    let swipeBottom = document.createEvent('HTMLEvents');
    swipeBottom.initEvent(`${pre}swipeBottom`, false, true);

    if ("ontouchstart" in window && "ontouchstart" in document) {
        window.addEventListener("touchstart", function (ev) {
            startX = ev.targetTouches[0].pageX;
            startY = ev.targetTouches[0].pageY;
            disX = 0;
            disY = 0;
            disc = distance;
            function fnMove(ev) {
                let curX = ev.targetTouches[0].pageX;
                let curY = ev.targetTouches[0].pageY;
                disX = curX - startX;
                disY = curY - startY;
            }
            function fnEnd() {
                let dir = getDir();//1=>横屏 0=>竖屏
                if (dir == 1) {
                    //设备横屏
                    if (disY < 0 && disY < Number(-disc)) {
                        // console.log("横屏Y上滑")
                        dispatch(swipeTop, { dis: Math.abs(disY) });
                    }
                    else if (disY > 0 && disY > disc) {
                        // console.log("横屏Y下滑")
                        dispatch(swipeBottom, { dis: Math.abs(disY) });
                    }
                    if (disX < 0 && disX < Number(-disc)) {
                        //  console.log("横屏X左边滑")
                        dispatch(swipeLeft, { dis: Math.abs(disX) });
                    }
                    else if (disX > 0 && disX > disc) {
                        //  console.log("横屏x右边滑")
                        dispatch(swipeRight, { dis: Math.abs(disX) });
                    }

                } else {
                    //设备竖屏
                    if (disY < 0 && disY < Number(-disc)) {
                        //  console.log("竖屏X左边")
                        dispatch(swipeLeft, { dis: Math.abs(disY) });
                    }
                    else if (disY > 0 && disY > disc) {
                        //  console.log("竖屏X右边")
                        dispatch(swipeRight, { dis: Math.abs(disY) });
                    }
                    //  console.log("disX < 0 && disX < Number(-disc)",Math.abs(disX),'++',disX,"??",disX < 0 && disX < Number(-disc))
                    if (disX < 0 && disX < Number(-disc)) {
                        //  alert("竖屏Y下滑")
                        dispatch(swipeBottom, { dis: Math.abs(disX) });
                    }
                    else if (disX > 0 && disX > disc) {
                        // console.log("竖屏Y上滑")
                        dispatch(swipeTop, { dis: Math.abs(disX) });
                    }
                }
                window.removeEventListener('touchmove', fnMove, false);
                window.removeEventListener('touchend', fnEnd, false);
            }
            window.addEventListener('touchmove', fnMove, false);
            window.addEventListener('touchend', fnEnd, false);
        }, false);
    }
    else {
        window.addEventListener("mousedown", (ev) => {
            let e = ev || window.event;
            startX = e.clientX;
            startY = e.clientY;
            disX = 0;
            disY = 0;
            disc = distance;
            function touchMove(e) {
                disX = e.clientX - startX;
                disY = e.clientY - startY;
            }
            function touchUp() {
                if (disY < 0 && disY < Number(-disc)) {
                    // console.log("横屏Y上滑")
                    dispatch(swipeTop, { dis: Math.abs(disY) });
                }
                else if (disY > 0 && disY > disc) {
                    //console.log("横屏Y下滑")
                    dispatch(swipeBottom, { dis: Math.abs(disY) });
                }
                if (disX < 0 && disX < Number(-disc)) {
                    //console.log("横屏X左边滑")
                    dispatch(swipeLeft, { dis: Math.abs(disX) });
                }
                else if (disX > 0 && disX > disc) {
                    // console.log("横屏x右边滑")
                    dispatch(swipeRight, { dis: Math.abs(disX) });
                }
                window.removeEventListener("mousemove", touchMove)
                window.removeEventListener("mouseup", touchUp)
            }
            window.addEventListener("mousemove", touchMove, false);
            window.addEventListener("mouseup", touchUp, false);
        })
    }

}

