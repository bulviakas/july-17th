import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SprocketStripProps {
  orientation?: 'horizontal' | 'vertical';
  length?: number;
}
 
export default function SprocketStrip({
  orientation = 'horizontal',
  length = 40,
}: SprocketStripProps) {
  const holes = Array.from({ length });
  const isVertical = orientation === 'vertical';
 
  return (
    <View style={isVertical ? styles.stripVertical : styles.stripHorizontal}>
      {holes.map((_, i) => (
        <View
          key={i}
          style={isVertical ? styles.holeVertical : styles.holeHorizontal}
        />
      ))}
    </View>
  );
}
 
const styles = StyleSheet.create({
  stripHorizontal: {
    flexDirection: 'row',
    height: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  stripVertical: {
    flexDirection: 'column',
    width: 16,
    alignItems: 'center',
    paddingVertical: 10,
  },
  holeHorizontal: {
    width: 8,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#0d0d0d',
    marginHorizontal: 8,
  },
  holeVertical: {
    width: 10,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#0d0d0d',
    marginVertical: 8,
  },
});
