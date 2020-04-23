/**
 * @author zhuwenfang
 * @module formatSecond 将秒转为天数小时分钟秒
 * @param {String} second 秒，默认为空
 * @returns {Object}  格式化的天数小时分钟秒对象
 */
const formatSecond = (second = '') => {
    if (!second) return;
    let theTime = parseInt(second);// 需要转换的时间秒
    let theTime1 = 0;// 分
    let theTime2 = 0;// 小时
    let theTime3 = 0;// 天
    if (theTime > 59) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 59) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
            if (theTime2 > 23) {
                theTime3 = parseInt(theTime2 / 24);
                theTime2 = parseInt(theTime2 % 24);
            }
        }
    }
    return {
        second: theTime,
        minute: theTime1,
        hour: theTime2,
        day: theTime3
    };
};

/**
 * @author zhuwenfang
 * @module tranformToSecond 将天小时分钟转为秒
 * @param {Number} day 天，默认为0
 * @param {Number} hour 天，默认为0
 * @param {Number} minute 天，默认为0
 * @returns {Number}  累计转换的秒
 */
const tranformToSecond = ({ day = 0, hour = 0, minute = 0 }) => {
    return day * 24 * 3600 + hour * 3600 + minute * 60;
};
export {
    formatSecond,
    tranformToSecond
};