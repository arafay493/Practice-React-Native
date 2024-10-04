import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import UserListWithCheckboxScreen from './screens/UserListWithCheckboxScreen/UserListWithCheckboxScreen';

const App = () => {
  const [location, setLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Request Location Permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show it on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
          getLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to show your location on the map.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // For iOS, request permission directly
      Geolocation.requestAuthorization('whenInUse').then(result => {
        if (result === 'granted') {
          setPermissionGranted(true);
          getLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to show your location on the map.',
          );
        }
      });
    }
  };

  // Fetch Current Location
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLocation(position);
      },
      error => {
        console.log(error.message);
        if (error.code === 1) {
          Alert.alert(
            'Location Services Disabled',
            'Please enable location services.',
          );
        } else {
          Alert.alert('Error Fetching Location', error.message);
        }
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     requestLocationPermission();
  //   }, 2000); // Runs every 5 seconds

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, [location]);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>
    //     Location Permission: {permissionGranted ? 'Granted' : 'Not Granted'}
    //   </Text>
    //   {location ? (
    //     <Text>
    //       Location:{' '}
    //       {`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`}
    //     </Text>
    //   ) : (
    //     <Text>Fetching Location...</Text>
    //   )}
    // </View>
    <View style={styles.container}>
      <ContactScreen />
      {/* <UserListWithCheckboxScreen /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
