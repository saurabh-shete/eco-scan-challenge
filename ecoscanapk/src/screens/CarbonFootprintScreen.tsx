import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import BACKEND_URL from '../config/index.js';

type CarbonFootprintScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EcoScoreScreen'
>;

const CarbonFootprintScreen: React.FC = ({route}: any) => {
  const {imageUri} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [carbonFootprintData, setCarbonFootprintData] = useState<any | null>(
    null,
  );
  const navigation = useNavigation<CarbonFootprintScreenNavigationProp>();

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', {
          uri:
            Platform.OS === 'android'
              ? imageUri
              : imageUri.replace('file://', ''),
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
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Image Analyzed Successfully!
              </Text>
              <Text style={styles.totalCarbon}>
                Total Carbon Footprint:{' '}
                {carbonFootprintData?.totalCarbonFootprint} kg CO₂
              </Text>
            </View>

            {/* Dynamic Bar Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartText}>Carbon Distribution</Text>
              <View style={styles.barChart}>
                {carbonFootprintData?.items.map((item: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.bar,
                      {
                        height: item.carbonFootprint * 5, // Bar height based on carbon footprint
                        backgroundColor:
                          index % 2 === 0 ? '#8BC34A' : '#4CAF50',
                      },
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Items List */}
            <Text style={styles.sectionTitle}>Item Details</Text>
            {carbonFootprintData?.items.map((item: any, index: number) => (
              <View key={index} style={styles.card}>
                <Image
                  source={require('../assets/clothing-icon.png')} // Add a clothing icon
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardText}>
                    Count: {item.count}, Carbon: {item.carbonFootprint} kg CO₂
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Next Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() =>
                navigation.navigate('EcoScoreScreen', {
                  totalCarbonFootprint:
                    carbonFootprintData.totalCarbonFootprint,
                })
              }>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  totalCarbon: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFB74D',
  },
  chartContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
  },
  chartText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 100,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 10,
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cardText: {
    fontSize: 14,
    color: '#757575',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
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
});

export default CarbonFootprintScreen;
