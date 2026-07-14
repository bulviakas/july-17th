import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = total > 0 ? completed / total : 0;
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percent,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: animatedWidth }]} />
      </View>
      <Text style={styles.label}>
        {Math.round(completed / total * 100)}% completed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '85%',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFCA06',
    borderRadius: 20,
    borderWidth: 4,
    padding: 32,
    paddingTop: 38,
  },
  track: {
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: '#FFCA06',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: 'black',
  },
  label: {
    marginTop: 6,
    fontSize: 13,
    color: '#5F0872',
  },
});