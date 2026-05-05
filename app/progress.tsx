import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as ImagePicker from 'expo-image-picker';
import { useProgressContext } from '@/context/ProgressContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProgressScreen() {
  const router = useRouter();
  const { history, addEntry } = useProgressContext();

  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  const [hips, setHips] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!weight) return; // Weight is required
    addEntry({
      date: new Date().toLocaleDateString(),
      weight,
      waist,
      chest,
      hips,
      photoUri,
    });
    // Reset form
    setWeight(''); setWaist(''); setChest(''); setHips(''); setPhotoUri(undefined);
  };

  // Prepare chart data
  const chartData = [...history].reverse(); // oldest to newest
  const labels = chartData.length > 0 ? chartData.map(d => d.date.substring(0, 5)) : ['Hoy'];
  const dataPoints = chartData.length > 0 ? chartData.map(d => parseFloat(d.weight) || 0) : [0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <IconSymbol name="chevron.down" size={24} color="#A0A0A0" />
        </TouchableOpacity>
        <Text style={styles.title}>Progreso</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Evolución de Peso (kg)</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: dataPoints }]
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          yAxisSuffix="kg"
          chartConfig={{
            backgroundColor: '#1E1E1E',
            backgroundGradientFrom: '#1E1E1E',
            backgroundGradientTo: '#1E1E1E',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 240, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#E1FF01" }
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Nuevo Registro</Text>
        <View style={styles.inputRow}>
          <TextInput style={[styles.input, styles.flex1]} placeholder="Peso (kg)" placeholderTextColor="#888" keyboardType="numeric" value={weight} onChangeText={setWeight} />
          <TextInput style={[styles.input, styles.flex1]} placeholder="Cintura (cm)" placeholderTextColor="#888" keyboardType="numeric" value={waist} onChangeText={setWaist} />
        </View>
        <View style={styles.inputRow}>
          <TextInput style={[styles.input, styles.flex1]} placeholder="Pecho (cm)" placeholderTextColor="#888" keyboardType="numeric" value={chest} onChangeText={setChest} />
          <TextInput style={[styles.input, styles.flex1]} placeholder="Cadera (cm)" placeholderTextColor="#888" keyboardType="numeric" value={hips} onChangeText={setHips} />
        </View>

        <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
          <IconSymbol name="camera.fill" size={20} color="#00F0FF" />
          <Text style={styles.photoBtnText}>{photoUri ? 'Cambiar Foto' : 'Añadir Foto'}</Text>
        </TouchableOpacity>
        
        {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}

        <TouchableOpacity style={[styles.saveBtn, !weight && styles.saveBtnDisabled]} onPress={handleSave} disabled={!weight}>
          <Text style={styles.saveBtnText}>Guardar Registro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Historial</Text>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>Aún no hay registros.</Text>
        ) : (
          history.map(entry => (
            <View key={entry.id} style={styles.historyCard}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyDate}>{entry.date}</Text>
                <Text style={styles.historyWeight}>{entry.weight} kg</Text>
                <Text style={styles.historyDetails}>
                  {entry.waist ? `Cin: ${entry.waist} ` : ''}
                  {entry.chest ? `Pec: ${entry.chest} ` : ''}
                  {entry.hips ? `Cad: ${entry.hips}` : ''}
                </Text>
              </View>
              {entry.photoUri && (
                <Image source={{ uri: entry.photoUri }} style={styles.historyThumb} />
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#151718' },
  content: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingTop: 10 },
  closeBtn: { padding: 8 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  chartContainer: { marginBottom: 32 },
  chart: { marginVertical: 8, borderRadius: 16 },
  formContainer: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 16, marginBottom: 32 },
  inputRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  flex1: { flex: 1 },
  input: { backgroundColor: '#2A2A2A', color: '#FFFFFF', borderRadius: 8, padding: 12, fontSize: 16 },
  photoBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 240, 255, 0.1)', padding: 14, borderRadius: 8, marginBottom: 12, gap: 8 },
  photoBtnText: { color: '#00F0FF', fontWeight: 'bold' },
  previewImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  saveBtn: { backgroundColor: '#E1FF01', padding: 16, borderRadius: 8, alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { color: '#000000', fontWeight: 'bold', fontSize: 16 },
  historyContainer: {},
  emptyText: { color: '#A0A0A0', textAlign: 'center', marginTop: 16 },
  historyCard: { flexDirection: 'row', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' },
  historyInfo: { flex: 1 },
  historyDate: { color: '#A0A0A0', fontSize: 12, marginBottom: 4 },
  historyWeight: { color: '#00F0FF', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  historyDetails: { color: '#FFFFFF', fontSize: 12 },
  historyThumb: { width: 60, height: 60, borderRadius: 8, marginLeft: 16 }
});
