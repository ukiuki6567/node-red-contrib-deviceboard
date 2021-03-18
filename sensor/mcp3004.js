const mcpadc = require('mcp-spi-adc');

module.exports = function(red) {
	function Mcp3004(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {

				node.send(msg);
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("mcp3004", Mcp3004);
}