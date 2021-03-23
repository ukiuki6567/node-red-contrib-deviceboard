const Gpio = require('pigpio').Gpio;
const Red = new Gpio(17, {mode: Gpio.OUTPUT});
const Green = new Gpio(27, {mode: Gpio.OUTPUT});
const Blue = new Gpio(22, {mode: Gpio.OUTPUT});

module.exports = function(red) {
	function rgbled(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				if(0 <= msg.red && msg.red <= 255)
					Red.pwmWrite(255 - msg.red);
				if(0 <= msg.green && msg.green <= 255)
					Green.pwmWrite(255 - msg.green);
				if(0 <= msg.blue && msg.blue <= 255)
					Blue.pwmWrite(255 - msg.blue);
				node.send(msg);
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("rgbled", rgbled);
}