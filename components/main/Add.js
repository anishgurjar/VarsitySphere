import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex: 1}}>

    <View style={styles.cameraContainer}>
      <Camera
       style={styles.fixedRatio} 
       type={type}
       ratio={'1:1'} />
    </View>

    <Button
        title="Flip Image"
        onPress={() => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
        }}>
    </Button>

  </View>
  
  );
}

const styles = StyleSheet.create({
    cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
});