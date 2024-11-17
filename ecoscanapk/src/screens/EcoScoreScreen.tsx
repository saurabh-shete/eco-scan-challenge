import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import BACKEND_URL from '../config/index.js';

const EcoScoreScreen: React.FC = ({route}: any) => {
    const {totalCarbonFootprint} = route.params;
  const [ecoRewardPoints, setEcoRewardPoints] = useState<number | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingEcoScore, setLoadingEcoScore] = useState<boolean>(true);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(false);

  // Fetch Eco-Score on Component Mount
  useEffect(() => {
    const calculateEcoScore = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/eco-score/calculate`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            totalCarbonFootprint,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setEcoRewardPoints(result.ecoRewardPoints);
        } else {
          console.error(result.message || 'Failed to calculate eco-score.');
        }
      } catch (error) {
        console.error('Error calculating eco-score:', error);
      } finally {
        setLoadingEcoScore(false);
      }
    };

    calculateEcoScore();
  }, [totalCarbonFootprint]);

  // Fetch Offers based on Eco-Reward Points
  const fetchOffers = async () => {
    try {
      setLoadingOffers(true);
      const response = await fetch(`${BACKEND_URL}/api/offers/top`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ecoRewardPoints,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setOffers(result.matchingOffers);
      } else {
        console.error(result.message || 'Failed to fetch offers.');
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoadingOffers(false);
    }
  };

  return (
    <View style={styles.container}>
      {loadingEcoScore ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.resultTitle}>Eco-Score Calculation</Text>
          <Text style={styles.totalCarbon}>
            Total Carbon Footprint: {totalCarbonFootprint} kg CO₂
          </Text>
          <Text style={styles.ecoScore}>
            Eco-Reward Points: {ecoRewardPoints || 0}
          </Text>

          {/* Show Offers Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={fetchOffers}
            disabled={loadingOffers || !ecoRewardPoints}>
            <Text style={styles.buttonText}>
              {loadingOffers ? 'Fetching Offers...' : 'Show Offers'}
            </Text>
          </TouchableOpacity>

          {/* Offers List */}
          {offers.length > 0 && (
            <View style={styles.offersContainer}>
              <Text style={styles.offersTitle}>Matching Offers</Text>
              {offers.map((offer: any) => (
                <View key={offer.id} style={styles.offerCard}>
                  <Text style={styles.offerName}>{offer.name}</Text>
                  <Text style={styles.offerPoints}>
                    Points Required: {offer.points}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
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
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  totalCarbon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFB74D',
  },
  ecoScore: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  offersContainer: {
    marginTop: 20,
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#388E3C',
    textAlign: 'center',
  },
  offerCard: {
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
  offerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  offerPoints: {
    fontSize: 14,
    color: '#757575',
  },
});

export default EcoScoreScreen;
