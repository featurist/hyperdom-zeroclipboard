var h = require('plastiq').html;
var ZeroClipboard = require('zeroclipboard');

module.exports = function (options, data, vdom) {
  if (arguments.length < 3) {
    vdom  = data;
    data = options;
  }

  return h.component(
    {
      oncopy: options && options.oncopy,
      data: data,
      onadd: function (element) {
        var self = this;
        this.client = new ZeroClipboard(element);

        this.client.on('ready', function () {
          self.client.on('copy', function () {
            setData(self.client, self.data);
          });

          self.client.on('aftercopy', function (ev) {
            if (self.oncopy) {
              self.oncopy();
            }
          });
        });
      }
    },
    vdom
  );
};

module.exports.config = function () {
  ZeroClipboard.config.apply(ZeroClipboard, arguments);
};

function setData(client, data) {
  if (typeof data === 'string') {
    client.setText(data);
  } else {
    Object.keys(data).forEach(function (mimeType) {
      client.setData(mimeType, data[mimeType]);
    });
  }
}
