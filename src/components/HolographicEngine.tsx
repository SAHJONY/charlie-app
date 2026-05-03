import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, useFrame, Circle, Rect, Filter, Blur } from '@shopify/react-native-skia';
import { LinearGradient, vec } from '@shopify/react-native-skia';

const { width, height } = Dimensions.get('window');

// Generative Background Shader
const HolographicBackground = ({ industry }: { industry: string }) => {
  const color1 = useRef(vec(0, 0, 0));
  const color2 = useRef(vec(0, 0, 0));
  const color3 = useRef(vec(0, 0, 0));

  // Dynamic color palette based on industry
  useEffect(() => {
    switch (industry) {
      case 'Real Estate':
        color1.current = vec(0.1, 0.1, 0.2); // Deep Navy
        color2.current = vec(0.2, 0.4, 0.6); // Ocean Blue
        color3.current = vec(0.6, 0.8, 1.0); // Sky Cyan
        break;
      case 'E-Commerce':
        color1.current = vec(0.2, 0.0, 0.1); // Deep Magenta
        color2.current = vec(0.8, 0.1, 0.4); // Hot Pink
        color3.current = vec(1.0, 0.4, 0.2); // Orange Glow
        break;
      case 'Legal Services':
        color1.current = vec(0.0, 0.0, 0.1); // Midnight
        color2.current = vec(0.2, 0.2, 0.4); // Slate
        color3.current = vec(0.6, 0.6, 0.8); // Silver
        break;
      case 'Personal Brand':
        color1.current = vec(0.1, 0.0, 0.2); // Deep Purple
        color2.current = vec(0.4, 0.1, 0.6); // Violet
        color3.current = vec(0.8, 0.6, 1.0); // Lavender
        break;
      default:
        color1.current = vec(0.0, 0.0, 0.0);
        color2.current = vec(0.1, 0.1, 0.1);
        color3.current = vec(0.2, 0.2, 0.2);
    }
  }, [industry]);

  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.current / 2000;
    // Animate gradient positions for "breathing" effect
    if (meshRef.current) {
      // Subtle morphing logic would go here for advanced shaders
    }
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ width, height }}>
        {/* Base Gradient */}
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={[
              `rgba(${color1.current.x * 255}, ${color1.current.y * 255}, ${color1.current.z * 255}, 0.4)`,
              `rgba(${color2.current.x * 255}, ${color2.current.y * 255}, ${color2.current.z * 255}, 0.3)`,
              `rgba(${color3.current.x * 255}, ${color3.current.y * 255}, ${color3.current.z * 255}, 0.2)`,
            ]}
            positions={[0, 0.5, 1]}
          />
        </Rect>

        {/* Floating Holographic Orbs */}
        <Circle cx={width * 0.3} cy={height * 0.4} r={150}>
          <Filter>
            <Blur blurRadius={60} />
          </Filter>
          <LinearGradient
            start={vec(width * 0.3 - 50, height * 0.4 - 50)}
            end={vec(width * 0.3 + 50, height * 0.4 + 50)}
            colors={[
              `rgba(${color2.current.x * 255}, ${color2.current.y * 255}, ${color2.current.z * 255}, 0.15)`,
              `rgba(${color3.current.x * 255}, ${color3.current.y * 255}, ${color3.current.z * 255}, 0.05)`,
            ]}
          />
        </Circle>

        <Circle cx={width * 0.7} cy={height * 0.6} r={120}>
          <Filter>
            <Blur blurRadius={50} />
          </Filter>
          <LinearGradient
            start={vec(width * 0.7 - 40, height * 0.6 - 40)}
            end={vec(width * 0.7 + 40, height * 0.6 + 40)}
            colors={[
              `rgba(${color3.current.x * 255}, ${color3.current.y * 255}, ${color3.current.z * 255}, 0.1)`,
              `rgba(${color1.current.x * 255}, ${color1.current.y * 255}, ${color1.current.z * 255}, 0.02)`,
            ]}
          />
        </Circle>

        {/* Grid Overlay for "Tech" feel */}
        <Rect x={0} y={0} width={width} height={height}>
          <Filter>
            <Blur blurRadius={2} />
          </Filter>
          {/* Simple grid pattern simulation via multiple thin rects would go here */}
        </Rect>
      </Canvas>
    </View>
  );
};

// Holographic Glass Card
export const HolographicCard = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return (
    <View style={[styles.card, style]}>
      {/* Glass Effect Layer */}
      <View style={styles.glassLayer} />
      {/* Content Layer */}
      <View style={styles.contentLayer}>{children}</View>
      {/* Glow Border */}
      <View style={styles.glowBorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    margin: 16,
  },
  glassLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)', // Note: This is a visual approximation; real blur requires Skia
  },
  contentLayer: {
    position: 'relative',
    zIndex: 2,
    padding: 20,
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default HolographicBackground;
