import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SprocketStripProps {
  length?: number;
}
 
export default function SprocketStrip({
  length = 40,
}: SprocketStripProps) {
  const holes = Array.from({ length });
 
  return (
    <View style={styles.strip}>
      {holes.map((_, i) => (
        <View key={i} style={styles.hole} />
      ))}
    </View>
  );
}
 
const styles = StyleSheet.create({
  strip: {
    flexDirection: 'column',
    width: 16,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  hole: {
    width: 32,
    height: 24,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#FFCA06',
    backgroundColor: '#3F184D',
    marginVertical: 8,
  },
});
