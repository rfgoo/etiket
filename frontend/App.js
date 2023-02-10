import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Image,
  Text,
  Alert,
} from 'react-native';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={require('/Users/duarte/Documents/Developer/etiket-1/frontend/images/E.png')}
      />
    </View>
    <View>
      <View style={styles.fixToText}>
        <Button
          color='#265581'
          title="Login"
          onPress={() => Alert.alert('Login')}
        />
      </View>
    </View>
    <View>
      <View style={styles.fixToText}>
        <Button
          color='#265581'
          title="Register"
          onPress={() => Alert.alert('Register')}
        />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 50,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 5,
    color: '#265581',
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 5,
    marginHorizontal: '15%',
    marginBottom: 40,
    color: '#265581',
    borderColor: '#9550BB'
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: '#265581',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  Logo: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    paddingTop: 50,
  },
});

export default App;