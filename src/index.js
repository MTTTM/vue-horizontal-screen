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
export const directive = {
    bind: function (el, binding) {
        
        let { cssVar, width, height, times, disabledresized } = binding.value;

        if (!cssVar) {
            cssVar = "hs-var";
        }
        if (!times) {
            times = 3;
        }
        let eventFunc = function () {
            let clientWidth = document.documentElement.clientWidth;
            let clientHeight = document.documentElement.clientHeight;
            let maxWidth = clientWidth > clientHeight ? clientWidth : clientHeight;
            let percent = maxWidth / (width / times);
            //如果按照宽度比例缩放后，布局高度比设备高度大，那就用高度来做比例
            if (getDir() == 1) {
                if (percent * height > clientHeight) {
                    percent = clientHeight / (height / times);
                }
            }
            else {
                if (percent * height > clientWidth) {
                    percent = clientWidth / (height / times);
                }
            }
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
            document.querySelector('html').style.setProperty(`--${cssVar}`, percent);
        }
        el.$hsLayout = eventFunc;
        let timer;
        let eventFunTime = function () {
            clearTimeout(timer);
            timer = setTimeout(() => {
                eventFunc();
            }, 500);
        }
        el.fn = eventFunTime;
        el.fn();
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
    //标记事件
    let swipeLeft = document.createEvent('HTMLEvents');
    swipeLeft.initEvent(`${pre}swipeLeft`, false, true);
    let swipeRight = document.createEvent('HTMLEvents');
    swipeRight.initEvent(`${pre}swipeRight`, false, true);
    let swipeTop = document.createEvent('HTMLEvents');
    swipeTop.initEvent(`${pre}swipeTop`, false, true);
    let swipeBottom = document.createEvent('HTMLEvents');
    swipeBottom.initEvent(`${pre}swipeBottom`, false, true);
    //派发事件
    function dispatch(event, data) {
        event.data = {
            data
        };
        // 触发自定义事件
        window.dispatchEvent(event);
    }
    window.addEventListener("touchstart", function (ev) {
        let startX = ev.targetTouches[0].pageX;
        let startY = ev.targetTouches[0].pageY;
        let disX = 0;
        let disY = 0;
        let disc = distance;
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
                    //alert("横屏Y上滑")
                    dispatch(swipeTop, { dis: Math.abs(disY) });
                }
                else if (disY > 0 && disY > disc) {
                    // alert("横屏Y下滑")
                    dispatch(swipeBottom, { dis: Math.abs(disY) });
                }
                if (disX < 0 && disX < Number(-disc)) {
                    // alert("横屏X左边滑")
                    dispatch(swipeLeft, { dis: Math.abs(disX) });
                }
                else if (disX > 0 && disX > disc) {
                    // alert("横屏x右边滑")
                    dispatch(swipeRight, { dis: Math.abs(disX) });
                }

            } else {
                //设备竖屏
                if (disY < 0 && disY < Number(-disc)) {
                    // alert("竖屏X左边")
                    dispatch(swipeLeft, { dis: Math.abs(disY) });
                }
                else if (disY > 0 && disY > disc) {
                    // alert("竖屏X右边")
                    dispatch(swipeRight, { dis: Math.abs(disY) });
                }
                //  console.log("disX < 0 && disX < Number(-disc)",Math.abs(disX),'++',disX,"??",disX < 0 && disX < Number(-disc))
                if (disX < 0 && disX < Number(-disc)) {
                    //  alert("竖屏Y下滑")
                    dispatch(swipeBottom, { dis: Math.abs(disX) });
                }
                else if (disX > 0 && disX > disc) {
                    // alert("竖屏Y上滑")
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

