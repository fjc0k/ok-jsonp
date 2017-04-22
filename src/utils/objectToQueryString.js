/**
 * Created by 方剑成 on 2017/4/22.
 */

export default (obj) => (
  typeof obj === 'object' ? Object.keys(obj).map(
    key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  ).join('&') : String(obj)
);