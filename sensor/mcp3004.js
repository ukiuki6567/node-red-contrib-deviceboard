module.exports = function(red) {
	function mcp3004(conf) {
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
	red.nodes.registerType("mcp3004", mcp3004);
}