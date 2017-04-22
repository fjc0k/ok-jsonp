# ok-jsonp
```shell
npm i ok-jsonp -S
```
```javascript
import jsonp from 'ok-jsonp';
jsonp(
  'http://foo.bar/jsonp',
  {
    type: 1,
    page: 2
  },
  '_callback'
).then(
  res => console.log(res),
  err => console.log(err)
);
```