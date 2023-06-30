import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import MapScreen from './baseControllers/MapScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function BookingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bookings!</Text>
    </View>
  );
}

function PaymentsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Payments!</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Chat!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
}

// Define the bottom tab navigator
const Tab = createBottomTabNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Map"
          activeColor="#1D4A79"
          inactiveColor="#444950"
          screenOptions={{headerShown: false}}
          barStyle={{backgroundColor: '#F2F3F5'}}>
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Bookings" component={BookingsScreen} />
          <Tab.Screen name="Payments" component={PaymentsScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
