const { Bme680 } = require('bme680-sensor');
const bme680 = new Bme680(1, 0x77);

module.exports = function(red) {
	function getEnvironment(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				bme680.initialize()
					.then(async () => {
						var obj = await bme680.getSensorData();
						msg.payload = obj.data;
						node.send(msg);
					})
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("bme680", getEnvironment);
}