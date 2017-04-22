/*!
 * ok-jsonp v1.0.0 
 * (c) 2017 fjc0k
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.OkJsonp = factory());
}(this, (function () { 'use strict';

/**
 * Created by 方剑成 on 2017/4/22.
 */

var objectToQueryString = function (obj) { return (
  typeof obj === 'object' ? Object.keys(obj).map(
    function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); }
  ).join('&') : String(obj)
); };

/**
 * Created by 方剑成 on 2017/4/22.
 */

var index = function (url, data, jsonp) {
  if ( data === void 0 ) data = {};
  if ( jsonp === void 0 ) jsonp = 'callback';

  return new Promise(function (resolve, reject) {

    var callback, script;

    if (typeof data === 'string') {
      jsonp = data;
      data = {};
    }

    callback = 'jsonp' + Math.random().toString(36).substr(2);

    data[jsonp] = callback;

    url += (url.indexOf('?') === -1 ? '?' : '&') + objectToQueryString(data);

    window[callback] = function (obj) {
      resolve(obj);
      try {
        delete window[callback];
        document.body.removeChild(script);
      } catch (e) {
        console.log(e);
      }
    };

    script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = reject;

    document.body.appendChild(script);

  });
};

return index;

})));
