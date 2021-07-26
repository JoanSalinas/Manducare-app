import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList, Image, ScrollView, Button,Dimensions,TouchableHighlight, TouchableOpacity   } from 'react-native';
import { Input, CheckBox, Overlay, ListItem } from 'react-native-elements';
import { postOrder } from '../api';
const departments = ["frozen", "other", "bakery", "produce", "alcohol", "international", "beverages", "pets", "dry goods pasta", "bulk", "personal care", "meat seafood", "pantry", "breakfast", "canned goods", "dairy eggs", "household", "babies", "snacks", "deli", "missing"]

const Item = ({ name, avg }) => (
	<View style={styles.item}>
		<View style={{flexDirection:'row', justifyContent:'space-between',padding:15, alignItems:'center'}}>
			<Text  style={styles.itemText}>- {name}</Text>
			<Text style={styles.itemText}>cada {avg} dies</Text>
		</View>
	</View>
);

export function HomeScreen() {

	const [products, setProducts] = useState([{name:'patata', timeAverage: 5}]);
	const [pantalla, setPantalla] = useState(0)
	const [name, setName] = useState();
	const [user, setUser] = useState('"No identificat"');
	const [timeAverage, setTimeAverage] = useState();

	const postTicket = async () => {

	}

	const addProductGoToProducts = async () => {
		let product = { name, timeAverage}
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
	
	const renderItem = ({ item }) => (
		<Item name={item.name} avg={item.timeAverage}/>
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
								containerStyle={{marginTop:15}} 
								style={styles.input} 
								placeholder="Escriu aqui el teu id o nom de usuari"
								onChangeText={user => setUser(user)}
							/>
							<Input 
								label="Nom del producte" 
								containerStyle={{marginTop:15}} 
								style={styles.input} 
								placeholder="Escriu aqui el teu producte"
								onChangeText={name => setName(name)}
							/>
							<Input 	
								label="Cada quants dies compres aquest producte aproximadament?" 
								keyboardType="numeric"
								style={styles.input} 
								placeholder="Escriu aqui un valor numeric"
								onChangeText={timeAverage => setTimeAverage(timeAverage)}
							/>
						</View>
						<View >  
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
						<Text style = {styles.subTitol}>Introdueix les dades del nou tiquet per l'usuari: <br>{user}</br></Text>
						<View >
							<FlatList 
								data={products}
								renderItem={renderItem}
								keyExtractor = {item => item.id}
							/>
							
							<View style={styles.openButton}>
								<Button color='tomato' title='Afegir un altre producte'  onPress={() => goToAddProducts()}/>
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
		backgroundColor: 'lightblue',
	},
	itemText:{
		color: '#fff',
		fontSize: 18
	},
	inputContainer:{
		justifyContent: 'space-between',
		marginHorizontal:20,
		paddingTop:20,
		paddingBottom:20
	},
	openButton: {
		margin:20,
		padding:2,
		backgroundColor: "tomato",
		borderRadius: 10,
		elevation: 2, 
	}
});
