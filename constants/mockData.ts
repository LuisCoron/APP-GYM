export const MOCK_USER = {
  name: 'Alex',
  streak: 12,
};

export const MOCK_WORKOUTS = [
  {
    id: '1',
    name: 'Día de Pecho y Tríceps',
    date: 'Ayer',
    duration: '45 min',
    volume: '4,500 kg',
    exercises: ['Press de Banca', 'Aperturas', 'Extensiones de tríceps'],
  },
  {
    id: '2',
    name: 'Día de Piernas',
    date: 'Hace 3 días',
    duration: '60 min',
    volume: '7,200 kg',
    exercises: ['Sentadillas', 'Prensa', 'Curl de isquios'],
  },
  {
    id: '3',
    name: 'Espalda y Bíceps',
    date: 'Hace 5 días',
    duration: '50 min',
    volume: '5,100 kg',
    exercises: ['Dominadas', 'Remo con barra', 'Curl de bíceps'],
  },
];

export const MOCK_CURRENT_WORKOUT = {
  name: 'Día de Pecho',
  exercises: [
    {
      id: 'e1',
      name: 'Press de Banca',
      sets: [
        { id: 's1', setNumber: 1, prev: '60kg x 10', weight: '60', reps: '10', completed: true },
        { id: 's2', setNumber: 2, prev: '60kg x 10', weight: '60', reps: '8', completed: true },
        { id: 's3', setNumber: 3, prev: '60kg x 8', weight: '60', reps: '', completed: false },
      ],
    },
    {
      id: 'e2',
      name: 'Aperturas con Mancuernas',
      sets: [
        { id: 's4', setNumber: 1, prev: '15kg x 12', weight: '15', reps: '', completed: false },
        { id: 's5', setNumber: 2, prev: '15kg x 12', weight: '15', reps: '', completed: false },
      ],
    },
  ],
};

export const MOCK_EXERCISES = [
  { id: 'ex1', name: 'Press de Banca', muscle: 'Pecho', equipment: 'Barra' },
  { id: 'ex2', name: 'Sentadillas', muscle: 'Piernas', equipment: 'Barra' },
  { id: 'ex3', name: 'Dominadas', muscle: 'Espalda', equipment: 'Peso corporal' },
  { id: 'ex4', name: 'Curl de Bíceps', muscle: 'Brazos', equipment: 'Mancuernas' },
  { id: 'ex5', name: 'Aperturas', muscle: 'Pecho', equipment: 'Mancuernas' },
  { id: 'ex6', name: 'Press Militar', muscle: 'Hombros', equipment: 'Barra' },
  { id: 'ex7', name: 'Prensa', muscle: 'Piernas', equipment: 'Máquina' },
  { id: 'ex8', name: 'Remo en Polea', muscle: 'Espalda', equipment: 'Máquina' },
];

export const EXERCISE_CATEGORIES = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros'];
