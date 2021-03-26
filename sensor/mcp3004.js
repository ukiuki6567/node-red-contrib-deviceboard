const mcpadc = require('mcp-spi-adc');

module.exports = function(red) {
	function Mcp3004(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				const analogSensor = mcpadc.open(msg.channel ,err => {
					if(err){
						throw err;
					}
					analogSensor.read((err, reading) => {
						if(err){
							throw err;
						}
						msg.payload = reading.value*1024;
						node.send(msg);
					});
				});

			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("mcp3004", Mcp3004);
}