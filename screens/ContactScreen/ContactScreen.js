import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestContactsPermission();
    } else {
      loadContacts();
    }
  }, []);

  const requestContactsPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      loadContacts();
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Load Contacts" onPress={loadContacts} />
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({item}) => (
          <View style={{width: '100%'}}>
            <Text>{item.displayName}</Text>
          </View>
        )}
        style={{width: '80%'}}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
