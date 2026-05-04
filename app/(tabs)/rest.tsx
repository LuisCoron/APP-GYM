import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';

const PRESETS = [
  { label: '1m', value: 60 },
  { label: '2m', value: 120 },
  { label: '3m', value: 180 },
];

export default function RestScreen() {
  const [timeLeft, setTimeLeft] = useState(90);
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(90);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customMin, setCustomMin] = useState('0');
  const [customSec, setCustomSec] = useState('0');

  const handleCustomTimeSave = () => {
    const min = parseInt(customMin) || 0;
    const sec = parseInt(customSec) || 0;
    const total = (min * 60) + sec;
    if (total > 0) {
      setPreset(total);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialTime);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const setPreset = (seconds: number) => {
    setIsActive(false);
    setInitialTime(seconds);
    setTimeLeft(seconds);
  };

  const addTime = (seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
    setInitialTime((prev) => prev + seconds);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = initialTime > 0 ? timeLeft / initialTime : 0;
  
  // Color dinámico: verde si está activo, amarillo si está pausado, rojo si se acaba
  const circleColor = isActive ? '#00F0FF' : timeLeft === 0 ? '#FF3366' : '#E1FF01';

  return (
    <View style={styles.container}>
      
      <View style={styles.presetsWrapper}>
        <Text style={styles.sectionTitle}>Preajustes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presetsScroll}>
          {PRESETS.map((preset) => (
            <TouchableOpacity 
              key={preset.label} 
              style={[
                styles.presetChip, 
                initialTime === preset.value && styles.presetChipActive
              ]}
              onPress={() => setPreset(preset.value)}
            >
              <Text style={[
                styles.presetText,
                initialTime === preset.value && styles.presetTextActive
              ]}>
                {preset.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.presetChip}
            onPress={() => {
              setCustomMin(Math.floor(initialTime / 60).toString());
              setCustomSec((initialTime % 60).toString());
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.presetText}>+ Personalizado</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.timerContainer}>
        <View style={[styles.timerCircle, { borderColor: circleColor }]}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.timerLabel}>
            {timeLeft === 0 ? "¡Tiempo Terminado!" : isActive ? "En curso..." : "Pausado"}
          </Text>
        </View>
      </View>

      <View style={styles.adjustmentsContainer}>
        <TouchableOpacity style={styles.adjustBtn} onPress={() => addTime(30)}>
          <Text style={styles.adjustText}>+30s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adjustBtn} onPress={() => addTime(60)}>
          <Text style={styles.adjustText}>+1min</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlBtn} onPress={resetTimer}>
          <Text style={styles.controlText}>Reiniciar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlBtn, styles.mainControl, { borderColor: circleColor }]} 
          onPress={toggleTimer}
        >
          <Text style={[styles.mainControlText, { color: circleColor }]}>
            {isActive ? 'Pausar' : timeLeft === 0 ? 'Repetir' : 'Iniciar'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlBtn} onPress={() => setTimeLeft(0)}>
          <Text style={styles.controlText}>Saltar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tiempo Personalizado</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <TextInput 
                  style={styles.timeInput} 
                  keyboardType="numeric"
                  value={customMin}
                  onChangeText={setCustomMin}
                  maxLength={2}
                />
                <Text style={styles.inputLabel}>min</Text>
              </View>
              <Text style={styles.timeColon}>:</Text>
              <View style={styles.inputGroup}>
                <TextInput 
                  style={styles.timeInput} 
                  keyboardType="numeric"
                  value={customSec}
                  onChangeText={setCustomSec}
                  maxLength={2}
                />
                <Text style={styles.inputLabel}>seg</Text>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={handleCustomTimeSave}>
                <Text style={styles.modalSaveText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  presetsWrapper: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  presetsScroll: {
    gap: 10,
    paddingRight: 32,
  },
  presetChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  presetChipActive: {
    backgroundColor: 'rgba(225, 255, 1, 0.1)',
    borderColor: '#E1FF01',
  },
  presetText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  presetTextActive: {
    color: '#E1FF01',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 8,
  },
  adjustmentsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 30,
  },
  adjustBtn: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  adjustText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    gap: 20,
  },
  controlBtn: {
    backgroundColor: '#2A2A2A',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainControl: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 2,
  },
  mainControlText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    borderRadius: 12,
    width: 70,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#A0A0A0',
    marginTop: 8,
  },
  timeColon: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalCancel: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    marginRight: 6,
  },
  modalCancelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalSave: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#E1FF01',
    alignItems: 'center',
    marginLeft: 6,
  },
  modalSaveText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
