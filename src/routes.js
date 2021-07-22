import * as React from 'react';
import { View, Text } from 'react-native';

//Navigator imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//icon imports
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens imports
import { HomeScreen } from './Screens/homeScreen';
import { TiquetsScreen } from './Screens/tiquetsScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: 'Manducare' }} />
    </HomeStack.Navigator>
  );
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export function RootStack() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
					} else if (route.name === 'Tiquets') {
						iconName = 'ios-list';
					}
					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: 'tomato',
				inactiveTintColor: 'gray',
			}}
		>
			<Tab.Screen name="Home" component={HomeStackScreen} />
			<Tab.Screen name="Tiquets" component={TiquetsScreen} />
		</Tab.Navigator>
	);
}
