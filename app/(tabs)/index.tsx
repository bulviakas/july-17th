import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CHALLENGES } from '../../assets/data/challenges';
import ProgressBar from '../../components/ProgressBar';
import { useChallenges } from '../../contexts/challenge-context';
import { MapChallenge } from '../../types/map-challenge';


import Section from '@/components/section';

export default function Index() {

  const router = useRouter();

    const { completed } = useChallenges();
    const [selectedChallenge, setSelectedChallenge] = useState<MapChallenge | null>(
      null
    );
    const [modalVisible, setModalVisible] = useState<boolean>(false);
  
    const completedCount = Object.keys(completed).filter(
      (id) => completed[id]
    ).length;

    const openChallenge = (challenge: MapChallenge): void => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };
 
  const closeChallenge = (): void => {
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer} >

      </View>
      <View style={styles.panelContainer}>
        <Section label="Geoguesser" onPress={() => router.push("/(tabs)/map-section")}/>
        <Section label="Colour Catch" onPress={() => router.push("/(tabs)/colour-section")}/>
        <Section label="Photo Booth" onPress={() => router.push("/(tabs)/photo-section")}/>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar completed={completedCount} total={CHALLENGES.length} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F184D',
  },
  infoContainer: {
    height: 100,
  },
  panelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginTop: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 8,
  }
});