import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { EXERCISES_DB, EXERCISE_CATEGORIES, ExerciseDetail } from '@/constants/exercisesDB';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Habilitar animaciones en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExercisesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredExercises = EXERCISES_DB.filter(ex => {
    const matchesCategory = activeCategory === 'Todos' || ex.primaryMuscle === activeCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }: { item: ExerciseDetail }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity 
        style={[styles.exerciseCard, isExpanded && styles.exerciseCardExpanded]} 
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseIcon}>
            <IconSymbol name="figure.strengthtraining.traditional" size={24} color="#00F0FF" />
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDetail}>{item.primaryMuscle} • {item.equipment}</Text>
          </View>
          <IconSymbol name={isExpanded ? "chevron.left.forwardslash.chevron.right" : "chevron.right"} size={20} color="#A0A0A0" />
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{item.level}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Ejecución</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Músculos Secundarios</Text>
            <View style={styles.tagsContainer}>
              {item.secondaryMuscles.length > 0 ? (
                item.secondaryMuscles.map(m => (
                  <View key={m} style={styles.tag}>
                    <Text style={styles.tagText}>{m}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.descriptionText}>Ninguno principal</Text>
              )}
            </View>

            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Beneficios</Text>
            <Text style={styles.descriptionText}>{item.benefits}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar ejercicio..."
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {EXERCISE_CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
              onPress={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredExercises.length > 0 ? (
        <FlatList
          data={filteredExercises}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron ejercicios.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },
  filterChipActive: {
    backgroundColor: '#00F0FF',
  },
  filterText: {
    color: '#A0A0A0',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000000',
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  exerciseCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  exerciseCardExpanded: {
    borderColor: '#00F0FF',
    backgroundColor: '#222222',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseDetail: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(225, 255, 1, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
  levelText: {
    color: '#E1FF01',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tagText: {
    color: '#00F0FF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
});
