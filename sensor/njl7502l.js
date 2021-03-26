const mcpadc = require('mcp-spi-adc');

module.exports = function(red) {
	function Njl7502l(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				const illumSensor = mcpadc.open(0,err => {
					if(err){
						throw err;
					}
					illumSensor.read((err, reading) => {
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
	red.nodes.registerType("njl7502l", Njl7502l);
}