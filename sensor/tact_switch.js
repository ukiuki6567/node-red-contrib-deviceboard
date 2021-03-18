const Gpio = require('pigpio').Gpio;
const button = new Gpio(20, {
	mode: Gpio.INPUT
});

module.exports = function(red) {
	function tact_switch(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				msg.payload = button.digitalRead();
				node.send(msg);
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("tact_switch", tact_switch);
}