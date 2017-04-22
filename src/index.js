/**
 * Created by 方剑成 on 2017/4/22.
 */

import objectToQueryString from './utils/objectToQueryString';

export default function (url, data = {}, jsonp = 'callback') {
  return new Promise((resolve, reject) => {

    let callback, script;

    if (typeof data === 'string') {
      jsonp = data;
      data = {};
    }

    callback = 'jsonp' + Math.random().toString(36).substr(2);

    data[jsonp] = callback;

    url += (url.indexOf('?') === -1 ? '?' : '&') + objectToQueryString(data);

    window[callback] = (obj) => {
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
}