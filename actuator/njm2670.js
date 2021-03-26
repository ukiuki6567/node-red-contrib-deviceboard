const Gpio = require('pigpio').Gpio;

var motor1 = null;
var motor2 = null;
var motorP = null;

module.exports = function(red) {
	function njm2670(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				if(msg.select=='A'){
					motor1 = new Gpio(6, {mode: Gpio.OUTPUT});
					motor2 = new Gpio(5, {mode: Gpio.OUTPUT});
					motorP = new Gpio(12, {mode: Gpio.OUTPUT});
				}else if(msg.select=='B'){
					motor1 = new Gpio(16, {mode: Gpio.OUTPUT});
					motor2 = new Gpio(26, {mode: Gpio.OUTPUT});
					motorP = new Gpio(13, {mode: Gpio.OUTPUT});
				}
				motor1.digitalWrite(msg.mode1);
				motor2.digitalWrite(msg.mode2);
				motorP.pwmWrite(msg.dutyCycle);
				node.send(msg);
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("njm2670", njm2670);
}