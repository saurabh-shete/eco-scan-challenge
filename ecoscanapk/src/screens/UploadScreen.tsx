import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type UploadScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UploadScreen'
>;

const UploadScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation<UploadScreenNavigationProp>();

  const handleCaptureImage = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleNext = () => {
    if (!imageUri) {
      Alert.alert('No Image Selected', 'Please upload or capture an image first.');
      return;
    }

    // Navigate to CarbonFootprintScreen and pass the image URI
    navigation.navigate('CarbonFootprintScreen', {imageUri});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload your Clothing Item</Text>

      <View style={styles.contentContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image selected</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSelectImage}>
            <Image
              source={{uri: 'https://img.icons8.com/ios-filled/50/upload.png'}}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleCaptureImage}>
            <Image
              source={{uri: 'https://img.icons8.com/ios-filled/50/camera.png'}}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  nextButton: {
    width: '80%',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
});

export default UploadScreen;
