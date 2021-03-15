module.exports = function(red) {
	function njm2670(conf) {
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
	red.nodes.registerType("njm2670", njm2670);
}