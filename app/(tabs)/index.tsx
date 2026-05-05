import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/Card';
import { StatBox } from '@/components/StatBox';
import { MOCK_USER } from '@/constants/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useWorkoutContext } from '@/context/WorkoutContext';
import { useTimerContext } from '@/context/TimerContext';
import { useProgressContext } from '@/context/ProgressContext';
import { EXERCISES_DB } from '@/constants/exercisesDB';

export default function HomeScreen() {
  const router = useRouter();
  const { history: workoutHistory } = useWorkoutContext();
  const { timeLeft, isActive } = useTimerContext();
  const { history: progressHistory } = useProgressContext();
  
  const lastWorkout = workoutHistory.length > 0 ? workoutHistory[0] : null;
  const lastProgress = progressHistory.length > 0 ? progressHistory[0] : null;
  const exercisesCount = EXERCISES_DB.length;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, {MOCK_USER.name}</Text>
        <Text style={styles.subtitle}>🔥 {MOCK_USER.streak} días en racha</Text>
      </View>

      <Card 
        title="Último Entrenamiento" 
        subtitle={lastWorkout ? lastWorkout.date : "Aún no hay registros"}
        onPress={() => router.push('/history')}
      >
        {lastWorkout ? (
          <>
            <Text style={styles.workoutName}>{lastWorkout.name}</Text>
            <View style={styles.statsRow}>
              <StatBox label="Volumen" value={lastWorkout.volume} color="#E1FF01" />
              <StatBox label="Tiempo" value={lastWorkout.duration} color="#00F0FF" />
            </View>
          </>
        ) : (
          <Text style={styles.emptyText}>Completa una rutina para ver tu progreso aquí.</Text>
        )}
      </Card>

      <Card 
        title="Descanso Actual" 
        onPress={() => router.push('/rest')}
        style={styles.restCard}
      >
        <View style={styles.restContent}>
          <IconSymbol name="timer" size={32} color={isActive ? "#00F0FF" : "#E1FF01"} />
          <Text style={[styles.restTime, isActive && { color: "#00F0FF" }]}>{formatTime(timeLeft)}</Text>
        </View>
        <Text style={styles.restHint}>
          {isActive ? "Descanso en progreso..." : "Listo para la próxima serie"}
        </Text>
      </Card>

      <Card
        title="Progreso"
        subtitle={lastProgress ? lastProgress.date : "Registra tu peso"}
        onPress={() => router.push('/progress')}
        style={styles.progressCard}
      >
        <View style={styles.progressContent}>
          <View style={styles.progressIconContainer}>
            <IconSymbol name="chart.line.uptrend.xyaxis" size={32} color="#E1FF01" />
          </View>
          <View style={styles.progressData}>
            <Text style={styles.progressValue}>
              {lastProgress ? `${lastProgress.weight} kg` : '-- kg'}
            </Text>
            <Text style={styles.progressSubtext}>
              {lastProgress ? 'Último registro' : 'Toca para empezar'}
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.gridContainer}>
        <Card 
          style={styles.gridItem} 
          onPress={() => router.push('/workout')}
        >
          <IconSymbol name="figure.strengthtraining.traditional" size={40} color="#E1FF01" />
          <Text style={styles.gridItemText}>Entrenar</Text>
          <Text style={styles.gridItemSubText}>
            {workoutHistory.length} {workoutHistory.length === 1 ? 'rutina' : 'rutinas'}
          </Text>
        </Card>
        
        <Card 
          style={styles.gridItem}
          onPress={() => router.push('/exercises')}
        >
          <IconSymbol name="list.bullet.clipboard" size={40} color="#00F0FF" />
          <Text style={styles.gridItemText}>Ejercicios</Text>
          <Text style={styles.gridItemSubText}>{exercisesCount} disponibles</Text>
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
  emptyText: {
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 8,
  },
  restCard: {
    borderColor: '#E1FF01',
    borderWidth: 1,
    marginBottom: 16,
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
  progressCard: {
    marginBottom: 16,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressIconContainer: {
    backgroundColor: 'rgba(225, 255, 1, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  progressData: {
    flex: 1,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressSubtext: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 4,
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
    marginTop: 12,
  },
  gridItemSubText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 4,
  },
});

