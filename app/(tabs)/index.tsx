import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/Card';
import { StatBox } from '@/components/StatBox';
import { MOCK_USER, MOCK_WORKOUTS } from '@/constants/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const router = useRouter();
  const lastWorkout = MOCK_WORKOUTS[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, {MOCK_USER.name}</Text>
        <Text style={styles.subtitle}>🔥 {MOCK_USER.streak} días en racha</Text>
      </View>

      <Card 
        title="Último Entrenamiento" 
        subtitle={lastWorkout.date}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.workoutName}>{lastWorkout.name}</Text>
        <View style={styles.statsRow}>
          <StatBox label="Volumen" value={lastWorkout.volume} color="#E1FF01" />
          <StatBox label="Tiempo" value={lastWorkout.duration} color="#00F0FF" />
        </View>
      </Card>

      <Card 
        title="Descanso Actual" 
        onPress={() => router.push('/rest')}
        style={styles.restCard}
      >
        <View style={styles.restContent}>
          <IconSymbol name="timer" size={32} color="#E1FF01" />
          <Text style={styles.restTime}>00:00</Text>
        </View>
        <Text style={styles.restHint}>Listo para la próxima serie</Text>
      </Card>

      <View style={styles.gridContainer}>
        <Card 
          style={styles.gridItem} 
          onPress={() => router.push('/workout')}
        >
          <IconSymbol name="figure.strengthtraining.traditional" size={40} color="#E1FF01" />
          <Text style={styles.gridItemText}>Empezar</Text>
          <Text style={styles.gridItemText}>Rutina</Text>
        </Card>
        
        <Card 
          style={styles.gridItem}
          onPress={() => router.push('/exercises')}
        >
          <IconSymbol name="list.bullet.clipboard" size={40} color="#00F0FF" />
          <Text style={styles.gridItemText}>Biblioteca</Text>
          <Text style={styles.gridItemText}>Ejercicios</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 4,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restCard: {
    borderColor: '#E1FF01',
    borderWidth: 1,
  },
  restContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  restTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  restHint: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  gridItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
});
