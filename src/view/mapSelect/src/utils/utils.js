/**
 * 函数防抖
 */
export function debounce(cb, wait = 250, immediate = false){
    let timeout;
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) {
                cb(...args);
            }
        }, wait);
        if (immediate && !timeout) {
            cb(...args);
        }
    };
}
/**
 * jsonp搜索工具
 * @param url
 * @param params
 * @param success
 */
export const jsonpHttp = (url, params= {}) => {
    return new Promise(((resolve, reject) => {
        try {
            const callbackName = `jsonp_${new Date().getTime()}`;
            const script = document.createElement('script');
            let baseUrl = `${url}?callback=${callbackName}`;
            for (const item of Object.keys(params)) {
                baseUrl += `&${item}=${params[item]}`;
            }
            script.src = baseUrl;
            document.body.appendChild(script);
            window[callbackName] = (res) => {
                resolve(res);
                delete window[callbackName];
                document.body.removeChild(script);
            };
        } catch (e) {
            reject(e);
        }
    }));
};

