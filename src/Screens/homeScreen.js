import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList, Image, ScrollView, Button,Dimensions,TouchableHighlight, TouchableOpacity   } from 'react-native';
import { Input, CheckBox, Overlay, ListItem, Icon } from 'react-native-elements';
import { postOrder } from '../api';
const departments = ["frozen", "other", "bakery", "produce", "alcohol", "international", "beverages", "pets", "dry goods pasta", "bulk", "personal care", "meat seafood", "pantry", "breakfast", "canned goods", "dairy eggs", "household", "babies", "snacks", "deli", "missing"]

export function HomeScreen() {

	const [dataSource, setDataSource] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(2)
	useState(() => {
		let items = Array.apply(null, Array(10)).map((v, i) => {
			return {
				id: i,
				src: 'http://placehold.it/200x200?text=' + (i + 1)
			};
		});
		setDataSource(items);
	}, []);

	return (
		<View style={styles.container}>
			<Text style = {styles.titol}>Manducare</Text>
			<Text style = {styles.subTitol}>Introdueix les dades del nou tiquet</Text>
			<View style={styles.inputContainer}>
				<StatusBar barStyle="light-content"/>
				<Input label="Nom del producte" containerStyle={{marginTop:15}} style={styles.input} />
				<Input label="Cada quants dies compres aquest producte aproximadament?" keyboardType="numeric"/>
			</View>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.inputContainer}>
					{departments.map((l, i) => (
						<View>
							<Text>- {l}</Text>
						</View>
					))}
				</ScrollView>

			</SafeAreaView>
			<View style={styles.inputContainer}>  
				<Button color='#e6aa12' title='Afegir i veure productes similars'  onPress={() => this._submit(context)}/>
			</View>

		</View>
	);
}
const _submit = async (context) => {
	this.setState({
		isSubmitting: true,
		errorMessage: null
	});
	let response = await postOrder("producte", "avg")
	if (response && response.error){
		console.log("no ok")
	}
	else{
		console.log("ok")
	};
};

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
		marginHorizontal:20,
		paddingTop:20,
		paddingBottom:20
	},
	itemContainer: {
		width: 30,
		height: 100,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
		alignItems: "center",
		shadowColor: "black",
		shadowOffset: {
				width: 1,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 10,
		padding: 10,
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
