var bus = 1;

var i2c = require('i2c-bus'),
    i2cBus = i2c.openSync(bus),
    oled = require('oled-i2c-bus');

const SIZE_X=128,
      SIZE_Y=64;

var opts = {
  width: SIZE_X,
  height: SIZE_Y,
  address: 0x3C
};

var oled = new oled(i2cBus, opts);
oled.clearDisplay();
oled.turnOnDisplay();

var font = require('oled-font-5x7');

module.exports = function(red) {
	function Oled(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				oled.clearDisplay();
				oled.setCursor(1, 1);
				oled.writeString(font, msg.size, msg.payload, 1, true);
				node.send(msg);
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("oled", Oled);
}