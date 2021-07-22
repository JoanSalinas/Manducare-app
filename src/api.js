let Route = ""
async function postOrder(name, avgTimeBuy) {
	return fetchTimeout(Route+'/public/register',{
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: name,
			avgTimeBuy: avgTimeBuy,
		})
	}).then((response) => response)
	.catch((error) => {
		console.log('register', error);
		return {error: error};
	});
}

exports.postOrder = postOrder;