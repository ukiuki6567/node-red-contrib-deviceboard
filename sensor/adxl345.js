const ADXL345 = require('adxl345-sensor');
const adxl345 = new ADXL345();

const getAcceleration = () => {
	adxl345.getAcceleration(true) // true for g-force units, else false for m/s²
		.then((acceleration) => {
			console.log(`acceleration = ${JSON.stringify(acceleration, null, 2)}`);
			setTimeout(getAcceleration, 1000);
		})
		.catch((err) => {
			console.log(`ADXL345 read error: ${err}`);
			setTimeout(getAcceleration, 2000);
		});
};

// Initialize the ADXL345 accelerometer
//
adxl345.init()
  .then(() => {
    console.log('ADXL345 initialization succeeded');
    getAcceleration();
  })
  .catch((err) => console.error(`ADXL345 initialization failed: ${err} `));

module.exports = function(red) {
	function Adxl345(conf) {
		red.nodes.createNode(this, conf);
		var node = this;

		try {
			node.on('input', function(msg) {
				adxl345.init()
					.then(() => {
						adxl345.getAcceleration(false)
							.then((accel) => {
								msg.payload = accel;
								node.send(msg);
							})
					})
			});
		}catch(e) {
			node.error(e);
		}
	}
	red.nodes.registerType("adxl345", Adxl345);
}