var h = require('hyperdom').html;
var ZeroClipboard = require('zeroclipboard');

module.exports = function (options, data, vdom) {
  if (arguments.length < 3) {
    vdom  = data;
    data = options;
  }

  return h.component(
    {
      oncopy: options && h.refreshify(options.oncopy),
      onerror: options && h.refreshify(options.onerror),
      data: data,
      onadd: function (element) {
        var self = this;
        this.client = new ZeroClipboard(element);

        this.client.on('error', function () {
          ZeroClipboard.destroy();
          if (self.onerror) {
            self.onerror.apply(self, arguments);
          }
        });

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
  } else if (typeof data === 'function') {
    client.setText(data());
  } else {
    Object.keys(data).forEach(function (mimeType) {
      var entry = data[mimeType];
      var content = typeof entry === 'function'
        ? entry()
        : entry;

      client.setData(mimeType, content);
    });
  }
}
