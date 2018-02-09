# ZeroClipboard for hyperdom

A hyperdom component for [ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard).

```js
var hyperdom = require('hyperdom');
var h = hyperdom.html;

function render(model) {
  return h('div',
    h('input', {type: 'text', binding: [model, 'text']}),
    zeroClipboard(model.text, h('button', 'copy'))
  );
}

hyperdom.append(document.body, render, {});
```

## api

```js
var vdom = zeroClipboard([options], data, buttonVdom);
```

* `options.oncopy` - function that is called after the copy has finished.
* `options.onerror` - function that is called when an error occurs, usually if flash isn't available. See the [error event](https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/api/ZeroClipboard.md#error) in ZeroClipboard documentation.
* `data` - either a string, a function that returns a string, or an object containing a string or function for each mime-type, e.g.:

    ```js
    {
      'text/plain': 'some text',
      'text/html': function () { return '<h1>some html</h1>'; }
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

## We're Hiring!
Featurist provides full stack, feature driven development teams. Want to join us? Check out [our career opportunities](https://www.featurist.co.uk/careers/).
