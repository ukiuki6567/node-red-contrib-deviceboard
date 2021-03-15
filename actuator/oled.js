module.exports = function(red) {
	function oled(conf) {
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
	red.nodes.registerType("oled", oled);
}