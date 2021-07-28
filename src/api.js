let Route = "http://127.0.0.1:5000/"
async function postOrder(user_id, products) {
	return fetch(Route+'/public/register',{
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
	console.log(Route+'recomendations')
	return fetch(Route+'recomendations',{
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			user: user_id,
			products: products,
		})
	}).then((response) => response.json())
    .then((json) => {
      return json;
    })
	.catch((error) => {
		console.log('register', error);
		return {error: error};
	});
}

exports.postOrder = postOrder;
exports.getRecomendations = getRecomendations;