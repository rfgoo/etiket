import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import InitialScreen from './InitialScreen';

const Separator = () => <View style={styles.separator} />;

const App = () => {
  return (
    <SafeAreaView style ={styles.root}>
      <InitialScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1E1E1E"
  },
});

export default App;