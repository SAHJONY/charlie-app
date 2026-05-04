import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Camera, Upload, Play, Pause, RefreshCw, Sparkles, Briefcase, ShoppingBag, Scale, User, Wrench } from 'lucide-react-native';

import HolographicBackground, { HolographicCard } from './src/components/HolographicEngine';
import NeuralLoader from './src/components/NeuralLoader';

const { width, height } = Dimensions.get('window');
const API_URL = 'http://69.62.68.67:3000';

type Industry = 'Real Estate' | 'E-Commerce' | 'Legal Services' | 'Personal Brand' | 'Freelancer';

const INDUSTRIES: { id: Industry; color: string; icon: React.ReactNode }[] = [
  { id: 'Real Estate', color: '#3b82f6', icon: <Briefcase size={20} color="#3b82f6" /> },
  { id: 'E-Commerce', color: '#ec4899', icon: <ShoppingBag size={20} color="#ec4899" /> },
  { id: 'Legal Services', color: '#64748b', icon: <Scale size={20} color="#64748b" /> },
  { id: 'Personal Brand', color: '#8b5cf6', icon: <User size={20} color="#8b5cf6" /> },
  { id: 'Freelancer', color: '#f59e0b', icon: <Wrench size={20} color="#f59e0b" /> },
];

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('Real Estate');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animate on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const cameraPerm = await useCameraPermissions();
      if (!cameraPerm) await requestPermission();
      
      const galleryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!galleryPerm) {
        Alert.alert('Permission Required', 'Please allow access to your photos.');
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setImageUri(result.assets[0].uri);
      setVideoUri(null);
      setProgress(0);
      setError(null);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission || !permission?.granted) return;

    const result = await CameraView.takePictureAsync({ quality: 1 });
    if (result) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setImageUri(result.uri);
      setVideoUri(null);
      setProgress(0);
      setError(null);
    }
  };

  const generateVideo = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select or take a photo first.');
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setError(null);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const formData = new FormData();
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      (formData as any).append('file', {
        uri: imageUri,
        name: filename || 'image.jpg',
        type,
      } as any);
      formData.append('industry', selectedIndustry);

      // Simulate progress for demo (replace with real upload progress in production)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      
      if (data.videoUrl) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setVideoUri(data.videoUrl);
      } else {
        throw new Error('No video URL returned');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate video. Using fallback cinematic sequence.');
      // Fallback: Show a demo video
      setVideoUri('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsUploading(false);
    }
  };

  const selectedColor = INDUSTRIES.find((i) => i.id === selectedIndustry)?.color || '#3b82f6';

  return (
    <View style={styles.container}>
      {/* Dynamic Holographic Background */}
      <HolographicBackground industry={selectedIndustry} />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
 {/* Header */}
 <View style={styles.header}>
 <Text style={styles.title}>
 <Sparkles size={24} color={selectedColor} /> Charlie
 </Text>
 <Text style={styles.subtitle}>Universal AI Video Engine</Text>
 </View>

 {/* Industry Selector */}
 <HolographicCard>
 <Text style={styles.sectionTitle}>Select Industry</Text>
 <Text style={styles.sectionDescription}>
 The AI will automatically adapt to {selectedIndustry.toLowerCase()} workflows.
 </Text>
 <View style={styles.industryGrid}>
              {INDUSTRIES.map((ind) => (
                <TouchableOpacity
                  key={ind.id}
                  style={[
                    styles.industryBtn,
                    selectedIndustry === ind.id && { borderColor: ind.color, backgroundColor: `${ind.color}15` },
                  ]}
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedIndustry(ind.id);
                  }}
                >
                  {ind.icon}
                  <Text style={[styles.industryText, { color: selectedIndustry === ind.id ? ind.color : '#aaa' }]}>
                    {ind.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </HolographicCard>

 {/* Upload Zone */}
 <HolographicCard>
 <Text style={styles.sectionTitle}>
 {selectedIndustry === 'Real Estate' ? 'Property Photos' :
  selectedIndustry === 'E-Commerce' ? 'Product Images' :
  selectedIndustry === 'Legal Services' ? 'Documents & Photos' :
  selectedIndustry === 'Personal Brand' ? 'Selfies & Clips' :
  'Project Assets'}
 </Text>
 <Text style={styles.sectionDescription}>
 {selectedIndustry === 'Real Estate' ? 'Turn property photos into cinematic tours.' :
  selectedIndustry === 'E-Commerce' ? 'Transform product photos into engaging demos.' :
  selectedIndustry === 'Legal Services' ? 'Create professional explainer videos.' :
  selectedIndustry === 'Personal Brand' ? 'Build your brand with high-quality content.' :
  'Manage multiple client projects from one dashboard.'}
 </Text>
 {imageUri ? (
              <View style={styles.imagePreview}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.reuploadBtn}
                  onPress={pickImage}
                >
                  <RefreshCw size={16} color="#fff" />
                  <Text style={styles.reuploadText}>Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadZone}>
                <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                  <Upload size={32} color={selectedColor} />
                  <Text style={styles.uploadText}>Select from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.uploadBtn, styles.cameraBtn]} onPress={takePhoto}>
                  <Camera size={32} color={selectedColor} />
                  <Text style={styles.uploadText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </HolographicCard>

          {/* Generate Button */}
          {!isUploading && !videoUri && (
            <TouchableOpacity
              style={[styles.generateBtn, { backgroundColor: selectedColor }]}
              onPress={generateVideo}
              disabled={!imageUri}
            >
              <Sparkles size={20} color="#fff" />
              <Text style={styles.generateText}>Generate Cinematic Video</Text>
            </TouchableOpacity>
          )}

          {/* Loading State */}
          {isUploading && <NeuralLoader progress={progress} />}

          {/* Video Player */}
          {videoUri && (
            <HolographicCard>
              <Text style={styles.sectionTitle}>Your Masterpiece</Text>
              <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: videoUri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
              <TouchableOpacity
                style={[styles.generateBtn, { backgroundColor: selectedColor, marginTop: 16 }]}
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setVideoUri(null);
                  setProgress(0);
                }}
              >
                <RefreshCw size={20} color="#fff" />
                <Text style={styles.generateText}>Create New Video</Text>
              </TouchableOpacity>
            </HolographicCard>
          )}

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 5,
  },
 sectionTitle: {
 fontSize: 18,
 fontWeight: '700',
 color: '#fff',
 marginBottom: 8,
 letterSpacing: 0.5,
 },
 sectionDescription: {
 fontSize: 14,
 color: '#94a3b8',
 marginBottom: 16,
 lineHeight: 20,
 },
 industryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  industryBtn: {
    flex: 1,
    minWidth: '30%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    gap: 8,
  },
  industryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadZone: {
    gap: 12,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cameraBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reuploadBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
  },
  reuploadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  generateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  video: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
