import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UploadScreen from './src/screens/UploadScreen';
import CarbonFootprintScreen from './src/screens/CarbonFootprintScreen';
import EcoScoreScreen from './src/screens/EcoScoreScreen';

export type RootStackParamList = {
  UploadScreen: undefined;
  CarbonFootprintScreen: {imageUri: string};
  EcoScoreScreen: {totalCarbonFootprint: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#f9f9f9'},
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 20, fontWeight: 'bold', color: 'green'},
        }}>
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
          options={{
            title: 'EcoScan',
            headerLeft: () => null, // Removes the back arrow
            gestureEnabled: false, // Prevents swipe-back gestures
          }}
        />
        <Stack.Screen
          name="CarbonFootprintScreen"
          component={CarbonFootprintScreen}
          options={{title: 'Carbon Footprint Analysis'}}
        />
        <Stack.Screen
          name="EcoScoreScreen"
          component={EcoScoreScreen}
          options={{title: 'Eco-Score & Offers'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
