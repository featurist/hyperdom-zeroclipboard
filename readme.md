# ZeroClipboard for Plastiq

A plastiq component for [ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard).

```js
var plastiq = require('plastiq');
var h = plastiq.html;

function render(model) {
  return h('div',
    h('input', {type: 'text', binding: [model, 'text']}),
    zeroClipboard(model.text, h('button', 'copy'))
  );
}

plastiq.append(document.body, render, {});
```

## api

```js
var vdom = zeroClipboard([options], data, buttonVdom);
```

* `options.oncopy` - function that is called after the copy has finished
* `data` - either a string, or an object containing data for each mime-type, e.g.:

    ```js
    {
      'text/plain': 'some text',
      'text/html': '<h1>some html</h1>'
    }
    ```

* `buttonVdom` - a vdom element, usually a `h('button')`, to act as the copy button.

## options

```js
zeroClipboard.options({...});
```

A way to configure ZeroClipboard, just delegates straight to `ZeroClipboard.options({...})`, see [options](https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/api/ZeroClipboard.md#configuration-options).

Most often you'll want to do this:

```js
zeroClipboard.options({swfPath: '/path/to/ZeroClipboard.swf'});
```