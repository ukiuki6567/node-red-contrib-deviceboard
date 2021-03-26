const Gpio = require('pigpio').Gpio;
var pin = null;

module.exports = function(red) {
	function Gpio_pin(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				if(msg.mode=='input'){
					switch(msg.pin){
						case 1:
							pin = new Gpio(4, {mode: Gpio.INPUT});
							msg.payload = pin.digitalRead();
							break;
						case 2:
							pin = new Gpio(25, {mode: Gpio.INPUT});
							msg.payload = pin.digitalRead();
							break;
						case 3:
							pin = new Gpio(24, {mode: Gpio.INPUT});
							msg.payload = pin.digitalRead();
							break;
						case 4:
							pin = new Gpio(23, {mode: Gpio.INPUT});
							msg.payload = pin.digitalRead();
							break;
					}
					node.send(msg);
				}else if(msg.mode=='output'){
					switch(msg.pin){
						case 1:
							pin = new Gpio(4, {mode: Gpio.OUTPUT});
							pin.digitalWrite(msg.value);
							break;
						case 2:
							pin = new Gpio(25, {mode: Gpio.OUTPUT});
							pin.digitalWrite(msg.value);
							break;
						case 3:
							pin = new Gpio(24, {mode: Gpio.OUTPUT});
							pin.digitalWrite(msg.value);
							break;
						case 4:
							pin = new Gpio(23, {mode: Gpio.OUTPUT});
							pin.digitalWrite(msg.value);
							break;
					}
					node.send(msg);
				}else if(msg.mode=='pwm'){
					switch(msg.pin){
						case 1:
							pin = new Gpio(4, {mode: Gpio.OUTPUT});
							pin.pwmWrite(msg.value);
							break;
						case 2:
							pin = new Gpio(25, {mode: Gpio.OUTPUT});
							pin.pwmWrite(msg.value);
							break;
						case 3:
							pin = new Gpio(24, {mode: Gpio.OUTPUT});
							pin.pwmWrite(msg.value);
							break;
						case 4:
							pin = new Gpio(23, {mode: Gpio.OUTPUT});
							pin.pwmWrite(msg.value);
							break;
					}
					node.send(msg);
				}
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("gpio_pin", Gpio_pin);
}