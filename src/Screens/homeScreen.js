import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList, Image, ScrollView, Button,Dimensions,TouchableHighlight, TouchableOpacity   } from 'react-native';
import { Input, CheckBox, Overlay, ListItem } from 'react-native-elements';
import { postOrder } from '../api';
const departments = ["frozen", "other", "bakery", "produce", "alcohol", "international", "beverages", "pets", "dry goods pasta", "bulk", "personal care", "meat seafood", "pantry", "breakfast", "canned goods", "dairy eggs", "household", "babies", "snacks", "deli", "missing"]

export function HomeScreen() {

	const [products, setProducts] = useState([{'name':'patata', 'timeAverage': 5}]);
	const [pantalla, setPantalla] = useState(0)
	const [name, setName] = useState();
	const [timeAverage, setTimeAverage] = useState();
	const addProductGoToProducts = async () => {
		const newList = products.concat({ name, timeAverage });
		let product = {'name':name, 'timeAverage': timeAverage}
		setProducts([...products, product])
		goToProducts()
		return
		try{

			let response = await postOrder("producte", "avg")
			if (response && response.error){
				alert("Error del servidor")
			}
			else{
				setProducts([...products, product])
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
	const Item = ({ title }) => (
		<View style={styles.item}>
			<Text style={styles.titol}>{title}</Text>
		</View>
	);
	const renderItem = ({ item }) => (
		<Item title={item.name} />
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
								label="Nom del producte" 
								containerStyle={{marginTop:15}} 
								style={styles.input} 
								placeholder="Escriu aqui el teu producte"
								onChangeText={name => setName({name})}
		          			/>
							<Input 	
								label="Cada quants dies compres aquest producte aproximadament?" 
								keyboardType="numeric"
								style={styles.input} 
								placeholder="Escriu aqui un valor numeric"
								onChangeText={timeAverage => setTimeAverage({timeAverage})}
							/>
						</View>
						<View >  
							<View style={styles.openButton}>
								<Button style = {styles.openButton} color='#e6aa12'  title='Afegir i veure productes similars'  onPress={() => addProductGoToProducts()}/>
							</View>
							<View style={styles.openButton}>
								<Button color='#e6aa12' style = {styles.openButton} title='Veure productes similars'  onPress={() => goToProducts()}/>
							</View>
						</View>
					</View>
				):
				(
					<View>
						<Text style = {styles.subTitol}>Introdueix les dades del nou tiquet</Text>
						<View >
							<FlatList 
								data={products}
								renderItem={renderItem}
								keyExtractor = {item => item.name}
							/>
							
							<View style={styles.openButton}>
								<Button style = {styles.openButton} color='#e6aa12'  title='Afegir un altre producte'  onPress={() => goToAddProducts()}/>
							</View>
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
		fontFamily: 'sans-serif-light'
	},
	imageThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
	},
	input: {
		fontSize: 16,
	},
	item: {
		flex: 1,
		margin: 3,
		backgroundColor: 'lightblue',
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	inputContainer:{
		justifyContent: 'space-between',
		marginHorizontal:20,
		paddingTop:20,
		paddingBottom:20
	},
	buttonsContainer:{
		justifyContent: 'space-between',
		marginHorizontal:20,
		paddingTop:20,
	},
	itemContainer: {
		width: 30,
		height: 100,
	},
	openButton: {
		margin:20,
		padding:5,
		backgroundColor: "tomato",
		borderRadius: 10,
		elevation: 2, 
	},
	textStyle: {
		color: "white",
		textAlign: "center",
		fontSize: 17,
		fontFamily: 'sans-serif-medium',
		marginHorizontal: 10
	},
	modalText: {
		marginBottom: 20,
		textAlign: "center",
		fontSize: 20,
		fontFamily: 'sans-serif-light'
	}
});
