module.exports = function(red) {
	function adxl345(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				node.send("Hello!");
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("adxl345", adxl345);
}