import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useWorkoutContext, WorkoutSession } from '@/context/WorkoutContext';
import { Card } from '@/components/Card';
import { StatBox } from '@/components/StatBox';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HistoryScreen() {
  const { history } = useWorkoutContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: WorkoutSession }) => {
    const isExpanded = expandedId === item.id;
    
    return (
      <Card 
        title={item.name} 
        subtitle={item.date}
        style={styles.card}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.statsRow}>
          <StatBox label="Volumen" value={item.volume} color="#E1FF01" />
          <StatBox label="Tiempo" value={item.duration} color="#00F0FF" />
        </View>
        
        {isExpanded && (
          <View style={styles.detailsContainer}>
            <View style={styles.divider} />
            <Text style={styles.detailsTitle}>Detalle del Entrenamiento:</Text>
            
            {item.exercises.map((ex, index) => (
              <View key={ex.id} style={styles.exerciseBlock}>
                <Text style={styles.exerciseName}>{index + 1}. {ex.name}</Text>
                
                <View style={styles.setHeader}>
                  <Text style={[styles.setCell, styles.flex1]}>Set</Text>
                  <Text style={[styles.setCell, styles.flex2]}>kg x reps</Text>
                  <Text style={[styles.setCell, styles.flex1]}>Estado</Text>
                </View>

                {ex.sets.map((set, setIndex) => (
                  <View key={set.id} style={styles.setRow}>
                    <Text style={[styles.setText, styles.flex1]}>{setIndex + 1}</Text>
                    <Text style={[styles.setText, styles.flex2]}>
                      {set.weight || '0'} kg x {set.reps || '0'}
                    </Text>
                    <View style={styles.flex1}>
                      {set.completed ? (
                        <IconSymbol name="checkmark" size={16} color="#E1FF01" />
                      ) : (
                        <Text style={styles.incompleteText}>-</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {!isExpanded && (
          <View style={styles.expandHint}>
            <Text style={styles.expandText}>Toca para ver detalles</Text>
            <IconSymbol name="chevron.right" size={16} color="#A0A0A0" />
          </View>
        )}
      </Card>
    );
  };

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <IconSymbol name="clock.fill" size={64} color="#2A2A2A" />
        <Text style={styles.emptyText}>Aún no hay entrenamientos registrados.</Text>
        <Text style={styles.emptySubtext}>Ve a la pestaña "Entrenar" y finaliza tu primera sesión.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#151718',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  emptySubtext: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expandHint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  expandText: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  detailsContainer: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  detailsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  exerciseBlock: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exerciseName: {
    color: '#00F0FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  setHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
    paddingBottom: 4,
    marginBottom: 8,
  },
  setCell: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  setRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  setText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  incompleteText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
});
