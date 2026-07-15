import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useChallenges } from '../contexts/ChallengeProvider';
import { PhotoChallenge } from '@/types/PhotoChallenge';
 
interface ChallengeModalProps {
  challenge: PhotoChallenge | null;
  visible: boolean;
  onClose: () => void;
}
 
const SCREEN_HEIGHT = Dimensions.get('window').height;
 
export default function PhotoChallengeModal({
  challenge,
  visible,
  onClose,
}: ChallengeModalProps) {
  const { completeChallenge, isCompleted, setChallengePhoto, getChallengePhoto } =
    useChallenges();
 
  const [isPicking, setIsPicking] = useState<boolean>(false);
 
  if (!challenge) return null;
 
  const done = isCompleted(challenge.id);

  const uploadedPhotoUri = getChallengePhoto(challenge.id);
 
  const handlePickImage = async (): Promise<void> => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
 
    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo gallery to complete this challenge.'
      );
      return;
    }
 
    setIsPicking(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      });
 
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setChallengePhoto(challenge.id, uri);
        completeChallenge(challenge.id);
      }
    } catch (err) {
      console.warn('Image picker error:', err);
      Alert.alert(
        'Something went wrong',
        'Could not open your gallery. Please try again.'
      );
    } finally {
      setIsPicking(false);
    }
  };
 
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{challenge.title}</Text>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={challenge.exampleImage}
              style={styles.image}
              contentFit="cover"
            />
            <Text style={styles.creditText}>{challenge.creditText}</Text>
 
            {uploadedPhotoUri && (
              <>
                <Text style={styles.separator}>Your photo</Text>
                <Image
                  source={{ uri: uploadedPhotoUri }}
                  style={styles.image}
                  contentFit="cover"
                />
              </>
            )}
          </ScrollView>
 
          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={onClose}>
              <Text style={styles.secondaryBtnText}>Close</Text>
            </TouchableOpacity>
 
            <TouchableOpacity
              style={[styles.primaryBtn, done && styles.primaryBtnDone]}
              onPress={handlePickImage}
              disabled={isPicking}
            >
              <Text style={styles.primaryBtnText}>
                {isPicking
                  ? 'Opening gallery...'
                  : done
                  ? 'Retake / Change Photo'
                  : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    maxHeight: SCREEN_HEIGHT * 0.75,
    backgroundColor: '#3F194D',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFCA06'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    margin: 6,
    marginBottom: 12,
    color: '#FFCA06'
  },
  description: {
    fontSize: 16,
    color: '#ED9BBD',
    marginBottom: 20,
    margin: 6,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 12,
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  secondaryBtnText: {
    color: '#ED9BBD',
  },
  primaryBtn: {
    backgroundColor: '#FFCA06',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  primaryBtnText: {
    color: '#68097E',
    fontWeight: '600',
  },
  image: {
    height: 300,
    margin: 6,
    marginBottom: 2,
    borderRadius: 18,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  creditText: {
    color: '#ED9BBD',
    fontSize: 10,
    margin: 8,
  },
  separator: {
    color: '#FFCA06',
    fontSize: 18,
    margin: 8,
    fontWeight: 'bold',
  },
  primaryBtnDone: {
    backgroundColor: '#3F194D'
  }
});