import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList, Image, ScrollView, Button,Dimensions,TouchableHighlight, TouchableOpacity   } from 'react-native';
import { Input, CheckBox, Overlay, ListItem } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { postOrder, getRecomendations } from '../api';
import allProductsFile from '../../resources/usefullProducts.json'

const departments = ["frozen", "other", "bakery", "produce", "alcohol", "international", "beverages", "pets", "dry goods pasta", "bulk", "personal care", "meat seafood", "pantry", "breakfast", "canned goods", "dairy eggs", "household", "babies", "snacks", "deli", "missing"]

const Item = ({ name, avg }) => (
	<View style={styles.item}>
		<View style={{flexDirection:'row', justifyContent:'space-between',padding:15, alignItems:'center'}}>
			<Text  style={styles.itemText}>- {name}</Text>
			<Text style={styles.itemText}>cada {avg} dies</Text>
		</View>
	</View>
);
const RecommendedItem = ({ name, rating }) => (
	<View style={styles.item}>
		<View style={{flexDirection:'row', justifyContent:'space-between',padding:15, alignItems:'center'}}>
			<Text  style={styles.itemText}>- {name}</Text>
			<Text style={styles.itemText}>{rating*10} %</Text>
		</View>
	</View>
);
export function HomeScreen() {
	//
	const [allProducts, setAllProducts] = useState([allProductsFile]);
	const [selectedValue, setSelectedValue] = useState({});
	const [queryInput, setQueryInput] = useState('');
	const findFilm = (query) => {
		// Method called every time when we change the value of the input
		if (query) {
			// Making a case insensitive regular expression
			const regex = new RegExp(`${query.trim()}`, 'i');
			// Setting the filtered film array according the query
			setFilteredProducts(
			    films.filter((film) => film.product_name.search(regex) >= 0)
			);
		} else {
			// If the query is null then return blank
			setFilteredProducts([]);
		}
	};

		//
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [recommendedProducts, setRecommendedProducts] = useState([{name:'patata', rating: 5}]);
	const [pantalla, setPantalla] = useState(0)
	const [name, setName] = useState();
	const [user, setUser] = useState('"No identificat"');
	const [timeAverage, setTimeAverage] = useState();

//
	const handleSearch = (name) => {
		setQueryInput(name)
		if(name.length > 3){
			//let value = event.target.value.toLowerCase();
			let value = name.toLowerCase();
			let result = [];
			console.log(value);
			result = allProductsFile.filter((data) => {
				return data.product_name.toLowerCase().search(value) != -1;
			});
			console.log(result)
			setFilteredProducts(result);
		}
		return
	}
//

	const postTicket = async () => {

	}

	const addProductGoToProducts = async () => {
		let product = { name, timeAverage}
		setProducts([...products, product])
		console.log(products)
		try{
			let response = await getRecomendations(user, products)
			if (response && response.error){
				alert("Error del servidor")
			}
			else{
				console.log(response)
				goToProducts()
			};
		}
		catch(e){
			alert("Error del servidor")
		}
	};

	const goToProducts = async () => {
		setPantalla(1)
	};

	const goToAddProducts = async () => {
		setPantalla(0)
	};
	
	const renderItem = ({ item }) => (
		<Item name={item.name} avg={item.timeAverage}/>
	);
	const renderRecommendedItem = ({ item }) => (
		<RecommendedItem name={item.name} rating={item.rating}/>
	);
	return (
		<View style={styles.container}>
			<Text style = {styles.titol}>Manducare</Text>
			{pantalla == 0 ? (
					<View>
						<Text style = {styles.subTitol}>Introdueix les dades del nou tiquet</Text>
						<View style={styles.inputContainer}>
							<StatusBar barStyle="light-content"/>
							<Input
								label="Usuari"
								value={user}
								style={styles.input}
								placeholder="Escriu aqui el teu id o nom de usuari"
								onChangeText={user => setUser(user)}
							/>
							
							<Input
								label="Nom del producte"
								style={styles.input}
								value={name}
								placeholder="Escriu aqui el teu producte"
								onChangeText={name => setName(name)}
							/>
							<Input
								label="Cada quants dies compres aquest producte aproximadament?"
								keyboardType="numeric"
								style={styles.input} 
								value={timeAverage}
								placeholder="Escriu aqui un valor numeric"
								onChangeText={timeAverage => setTimeAverage(timeAverage)}
							/>
						</View>
						<View>
							<View style={styles.openButton}>
								<Button color='tomato' title='Afegir i veure productes similars'  onPress={() => addProductGoToProducts()}/>
							</View>
							<View style={styles.openButton}>
								<Button color='tomato' title='Veure productes similars'  onPress={() => goToProducts()}/>
							</View>
						</View>
					</View>
				):
				(
					<View>
						<Text style = {styles.subTitol}>Dades del nou tiquet</Text>
						<View >
							<FlatList
								data={products}
								renderItem={renderItem}
								keyExtractor = {item => item.name}
							/>
							<Text></Text>
							<View style={styles.openButton}>
								<Button color='tomato' title='Afegir un altre producte'  onPress={() => goToAddProducts()}/>
							</View>
							<FlatList
								data={recommendedProducts}
								renderItem={renderRecommendedItem}
								keyExtractor = {item => item.name}
							/>
						</View>
					</View>
				)
			}
		</View>
	);
}


const size = Dimensions.get('window').width/3;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center"
	},
	titol:{
		alignSelf: 'center',
		fontSize: 40,
		fontFamily: 'sans-serif-light',
		margin: 20
	},
	subTitol:{
		alignSelf: 'center',
		fontSize: 20,
		fontFamily: 'sans-serif-light',
		padding:5,
		paddingBottom:15
	},
	input: {
		fontSize: 16,
	},
	item: {
		flex: 1,
		margin: 3,
		marginHorizontal: 15,
		paddingRight:5,
		borderRadius:30,
		backgroundColor: '#bef1becc',
	},
	itemText:{
		fontSize: 15,
    	margin: 2,
	},
	inputContainer:{
		//justifyContent: 'space-between',
		marginHorizontal:20,
		paddingTop:15,
		paddingBottom:15
	},
	openButton: {
		margin:20,
		padding:2,
		backgroundColor: "tomato",
		borderRadius: 10,
	},
	container1: {
		position: 'relative',
		backgroundColor: '#F5FCFF',
		flex: 1,

		// Android requiers padding to avoid overlapping
		// with content and autocomplete
		paddingTop: 50,

		marginTop: 25,

	},
	itemText: {
	  fontSize: 15,
	  margin: 2,
	},
	autocompleteContainer: {
	  // Hack required to make the autocomplete
	  // work on Andrdoid
	  flex: 1,
	  left: 0,
	  position: 'absolute',
	  right: 0,
	  top: 0,
	  zIndex:1,
	  padding: 5,
	},
});