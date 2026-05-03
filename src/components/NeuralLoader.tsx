import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Canvas, useFrame, Circle, vec } from '@shopify/react-native-skia';

const NeuralLoader = ({ progress }: { progress: number }) => {
  const count = 12;
  const radius = 60;
  const centerX = 100;
  const centerY = 100;

  const nodes = useRef(
    Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      distance: radius + Math.random() * 20,
      speed: 0.01 + Math.random() * 0.02,
      size: 2 + Math.random() * 3,
    }))
  );

  useFrame(({ clock }) => {
    const t = clock.current / 1000;
    // Animate nodes
    nodes.current.forEach((node, i) => {
      node.angle += node.speed * (i % 2 === 0 ? 1 : -1);
      node.distance = radius + Math.sin(t * 2 + i) * 10;
    });
  });

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {nodes.current.map((node, i) => (
          <Circle
            key={i}
            cx={centerX + Math.cos(node.angle) * node.distance}
            cy={centerY + Math.sin(node.angle) * node.distance}
            r={node.size * (progress / 100 + 0.5)}
            color={`rgba(100, 200, 255, ${0.3 + (progress / 100) * 0.7})`}
          />
        ))}
        {/* Connecting lines */}
        {nodes.current.map((node, i) =>
          nodes.current.slice(i + 1).map((node2, j) => {
            const dx =
              centerX + Math.cos(node.angle) * node.distance -
              (centerX + Math.cos(node2.angle) * node2.distance);
            const dy =
              centerY + Math.sin(node.angle) * node.distance -
              (centerY + Math.sin(node2.angle) * node2.distance);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              return (
                <Circle
                  key={`${i}-${j}`}
                  cx={centerX + (Math.cos(node.angle) * node.distance + Math.cos(node2.angle) * node2.distance) / 2}
                  cy={centerY + (Math.sin(node.angle) * node.distance + Math.sin(node2.angle) * node2.distance) / 2}
                  r={1}
                  color={`rgba(100, 200, 255, ${0.1 * (1 - dist / 80)})`}
                />
              );
            }
            return null;
          })
        )}
      </Canvas>
      <Text style={styles.text}>
        {progress < 100 ? `Generating Cinematic Video... ${Math.round(progress)}%` : 'Finalizing Masterpiece'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  canvas: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    color: '#64b5f6',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default NeuralLoader;
