import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapDemo from './components/MapDemo';

export default function App() {
  return (
    <View style={styles.container}>
      <MapDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
