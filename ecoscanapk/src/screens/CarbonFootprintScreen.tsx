import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import {BACKEND_URL} from '@env';

const CarbonFootprintScreen: React.FC = ({route}: any) => {
  const {imageUri} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [carbonFootprintData, setCarbonFootprintData] = useState<any | null>(null);

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
          type: 'image/jpeg',
          name: 'clothing_item.jpg',
        });

        const response = await fetch(`${BACKEND_URL}/api/images/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          setCarbonFootprintData(result);
        } else {
          console.error(result.message || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
      } finally {
        setLoading(false);
      }
    };

    analyzeImage();
  }, [imageUri]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <ScrollView>
          <Text style={styles.resultTitle}>Carbon Footprint Analysis</Text>
          {carbonFootprintData?.items.map((item: any, index: number) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.resultText}>
                {item.name} - Count: {item.count}, Carbon Footprint: {item.carbonFootprint} kg CO₂
              </Text>
            </View>
          ))}
          <Text style={styles.resultTotal}>
            Total Items: {carbonFootprintData?.totalItems}, Total Carbon Footprint:{' '}
            {carbonFootprintData?.totalCarbonFootprint} kg CO₂
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  resultItem: {
    marginVertical: 5,
  },
  resultText: {
    fontSize: 16,
  },
  resultTotal: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CarbonFootprintScreen;
