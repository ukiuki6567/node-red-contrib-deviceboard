const Gpio = require('pigpio').Gpio;
const buzzer =  new Gpio(18, {
	mode: Gpio.OUTPUT
});

function msleep(n){
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

module.exports = function(red) {
	function Buzzer(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				buzzer.hardwarePwmWrite(msg.frequency, 500000);
				msleep(msg.miliseconds);
				buzzer.pwmWrite(0);
				node.send(msg);
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("buzzer", Buzzer);
}