let Route = ""
async function postOrder(user_id, products) {
	return fetchTimeout(Route+'/public/register',{
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			user: user_id,
			products: products,
		})
	}).then((response) => response)
	.catch((error) => {
		console.log('register', error);
		return {error: error};
	});
}
async function getRecomendations(user_id, products) {
	return fetchTimeout(Route+'/public/register',{
		method: "get",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			user: user_id,
			products: products,
		})
	}).then((response) => response)
	.catch((error) => {
		console.log('register', error);
		return {error: error};
	});
}

exports.postOrder = postOrder;
exports.getRecomendations = getRecomendations;