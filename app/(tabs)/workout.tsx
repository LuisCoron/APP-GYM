import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useWorkoutContext } from '@/context/WorkoutContext';
import { useRouter } from 'expo-router';

// Tipos
type WorkoutSet = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

type Exercise = {
  id: string;
  name: string;
  sets: WorkoutSet[];
};

export default function WorkoutScreen() {
  const router = useRouter();
  const { addWorkout } = useWorkoutContext();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutName, setWorkoutName] = useState('Nuevo Entrenamiento');

  const finishWorkout = () => {
    if (exercises.length === 0) {
      Alert.alert('Error', 'Agrega al menos un ejercicio antes de finalizar.');
      return;
    }

    // Calcular volumen simple
    let totalVolume = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += (parseFloat(set.weight) * parseInt(set.reps, 10));
        }
      });
    });

    addWorkout({
      id: Date.now().toString(),
      name: workoutName,
      date: new Date().toLocaleDateString(),
      duration: '45 min', // Dummy por ahora
      volume: `${totalVolume} kg`,
      exercises: [...exercises],
    });

    setExercises([]);
    setWorkoutName('Nuevo Entrenamiento');
    router.push('/history');
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: 'Nuevo Ejercicio',
      sets: [
        { id: Date.now().toString() + '-1', weight: '', reps: '', completed: false }
      ],
    };
    setExercises([...exercises, newExercise]);
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        // Copiar el último set si existe
        const lastSet = ex.sets.length > 0 ? ex.sets[ex.sets.length - 1] : { weight: '', reps: '' };
        return {
          ...ex,
          sets: [...ex.sets, { 
            id: Date.now().toString(), 
            weight: lastSet.weight, 
            reps: lastSet.reps, 
            completed: false 
          }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => 
            set.id === setId ? { ...set, [field]: value } : set
          )
        };
      }
      return ex;
    }));
  };

  const toggleSetComplete = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => 
            set.id === setId ? { ...set, completed: !set.completed } : set
          )
        };
      }
      return ex;
    }));
  };

  const updateExerciseName = (exerciseId: string, newName: string) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId ? { ...ex, name: newName } : ex
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TextInput 
            style={styles.titleInput}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {exercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <View style={styles.exerciseHeaderRow}>
              <Text style={styles.exerciseNumber}>{index + 1}. </Text>
              <TextInput
                style={styles.exerciseNameInput}
                value={exercise.name}
                onChangeText={(text) => updateExerciseName(exercise.id, text)}
                placeholder="Nombre del ejercicio"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.cellSmall]}>Set</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>kg</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>Reps</Text>
              <Text style={[styles.headerCell, styles.cellSmall]}>✓</Text>
            </View>

            {exercise.sets.map((set, setIndex) => (
              <View key={set.id} style={[styles.setRow, set.completed && styles.setRowCompleted]}>
                <Text style={[styles.cellText, styles.cellSmall]}>{setIndex + 1}</Text>
                
                <View style={[styles.inputContainer, styles.cellMedium]}>
                  <TextInput
                    style={styles.textInput}
                    value={set.weight}
                    onChangeText={(val) => updateSet(exercise.id, set.id, 'weight', val)}
                    keyboardType="numeric"
                    placeholder="-"
                    placeholderTextColor="#555"
                  />
                </View>

                <View style={[styles.inputContainer, styles.cellMedium]}>
                  <TextInput
                    style={styles.textInput}
                    value={set.reps}
                    onChangeText={(val) => updateSet(exercise.id, set.id, 'reps', val)}
                    keyboardType="numeric"
                    placeholder="-"
                    placeholderTextColor="#555"
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.checkBtn, set.completed && styles.checkBtnActive, styles.cellSmall]}
                  onPress={() => toggleSetComplete(exercise.id, set.id)}
                >
                  {set.completed && <IconSymbol name={"checkmark" as any} size={20} color="#000" />}
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addSetBtn} onPress={() => addSet(exercise.id)}>
              <Text style={styles.addSetText}>+ Añadir Serie</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addExerciseBtn} onPress={addExercise}>
          <Text style={styles.addExerciseText}>Añadir Ejercicio</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.finishBtn} onPress={finishWorkout}>
          <Text style={styles.finishBtnText}>Finalizar Entrenamiento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    padding: 0,
  },
  timeElapsed: {
    fontSize: 18,
    color: '#E1FF01',
    fontWeight: '600',
    marginLeft: 10,
  },
  exerciseContainer: {
    marginBottom: 32,
  },
  exerciseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00F0FF',
  },
  exerciseNameInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00F0FF',
    flex: 1,
    padding: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  headerCell: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  setRowCompleted: {
    backgroundColor: '#2A3B1C',
  },
  cellText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    marginHorizontal: 4,
    height: 36,
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  checkBtn: {
    backgroundColor: '#333333',
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  checkBtnActive: {
    backgroundColor: '#E1FF01',
  },
  cellSmall: { width: '15%' },
  cellMedium: { width: '35%' },
  addSetBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  addSetText: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '500',
  },
  addExerciseBtn: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00F0FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  addExerciseText: {
    color: '#00F0FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#151718',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  finishBtn: {
    backgroundColor: '#E1FF01',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  finishBtnText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
