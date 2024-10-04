import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this is installed

const UserListWithCheckboxScreen = () => {
  // List of users
  const users = [
    {id: 1, name: 'User 1'},
    {id: 2, name: 'User 2'},
    {id: 3, name: 'User 3'},
    {id: 4, name: 'User 4'},
  ];

  // State to store selected users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Toggle selection
  const toggleSelection = userId => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  console.log(selectedUsers);
  // Render each user
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      {/* Custom Checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleSelection(item.id)}>
        {/* Display checkmark if selected */}
        {selectedUsers.includes(item.id) && (
          <Icon name="check" size={20} color="#fff" />
        )}
      </TouchableOpacity>

      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Unchecked color
  },
});

export default UserListWithCheckboxScreen;
