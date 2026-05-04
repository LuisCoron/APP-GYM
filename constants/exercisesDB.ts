export type ExerciseLevel = 'Principiante' | 'Intermedio' | 'Avanzado';

export type ExerciseDetail = {
  id: string;
  name: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  description: string;
  benefits: string;
  level: ExerciseLevel;
  equipment: string;
};

export const EXERCISE_CATEGORIES = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core'];

export const EXERCISES_DB: ExerciseDetail[] = [
  // PECHO
  {
    id: 'chest_1',
    name: 'Press de Banca con Barra',
    primaryMuscle: 'Pecho',
    secondaryMuscles: ['Tríceps', 'Hombro Anterior'],
    description: 'Acuéstate en el banco plano. Sujeta la barra con un agarre ligeramente más ancho que los hombros. Baja la barra de forma controlada hasta la mitad del pecho y empuja hacia arriba explosivamente.',
    benefits: 'Desarrollo de fuerza general en el tren superior e hipertrofia del pectoral mayor.',
    level: 'Intermedio',
    equipment: 'Barra, Banco',
  },
  {
    id: 'chest_2',
    name: 'Aperturas con Mancuernas',
    primaryMuscle: 'Pecho',
    secondaryMuscles: ['Hombro Anterior'],
    description: 'Acuéstate en un banco con una mancuerna en cada mano encima del pecho. Baja los brazos en arco hacia los lados sintiendo el estiramiento, manteniendo los codos ligeramente flexionados, y vuelve a juntarlos.',
    benefits: 'Gran aislamiento del pectoral y excelente estiramiento para fomentar hipertrofia.',
    level: 'Principiante',
    equipment: 'Mancuernas, Banco',
  },
  {
    id: 'chest_3',
    name: 'Flexiones de Pecho (Push-ups)',
    primaryMuscle: 'Pecho',
    secondaryMuscles: ['Tríceps', 'Core', 'Hombros'],
    description: 'En posición de plancha alta, baja el cuerpo doblando los codos hasta que el pecho casi toque el suelo, luego empuja hacia arriba manteniendo el core apretado.',
    benefits: 'Ejercicio fundamental de peso corporal que mejora la fuerza funcional.',
    level: 'Principiante',
    equipment: 'Peso Corporal',
  },

  // ESPALDA
  {
    id: 'back_1',
    name: 'Dominadas (Pull-ups)',
    primaryMuscle: 'Espalda',
    secondaryMuscles: ['Bíceps', 'Antebrazos'],
    description: 'Cuélgate de una barra con agarre prono (palmas hacia adelante) un poco más ancho que los hombros. Tracciona tu cuerpo hacia arriba hasta que la barbilla pase la barra, y baja controladamente.',
    benefits: 'El mejor ejercicio para desarrollar la amplitud y fuerza del dorsal ancho.',
    level: 'Intermedio',
    equipment: 'Barra de Dominadas',
  },
  {
    id: 'back_2',
    name: 'Remo con Barra',
    primaryMuscle: 'Espalda',
    secondaryMuscles: ['Bíceps', 'Lumbares', 'Trapecios'],
    description: 'Flexiona las rodillas e inclina el torso hacia adelante manteniendo la espalda recta. Tira de la barra hacia tu ombligo retrayendo las escápulas.',
    benefits: 'Añade densidad y grosor a toda la musculatura de la espalda.',
    level: 'Intermedio',
    equipment: 'Barra',
  },
  {
    id: 'back_3',
    name: 'Jalón al Pecho',
    primaryMuscle: 'Espalda',
    secondaryMuscles: ['Bíceps'],
    description: 'Siéntate en la máquina, agarra la barra ancha y tira hacia la parte superior del pecho juntando los omóplatos.',
    benefits: 'Excelente para quienes aún no pueden hacer dominadas, aislando los dorsales.',
    level: 'Principiante',
    equipment: 'Máquina de Poleas',
  },

  // PIERNAS
  {
    id: 'legs_1',
    name: 'Sentadilla Libre',
    primaryMuscle: 'Piernas',
    secondaryMuscles: ['Glúteos', 'Core', 'Lumbares'],
    description: 'Coloca la barra sobre tus trapecios. Separa los pies a la anchura de los hombros. Desciende flexionando rodillas y caderas como si fueras a sentarte en una silla, manteniendo el pecho erguido, y vuelve a subir.',
    benefits: 'Ejercicio rey para desarrollar masa muscular y fuerza en todo el tren inferior.',
    level: 'Intermedio',
    equipment: 'Barra, Rack',
  },
  {
    id: 'legs_2',
    name: 'Prensa Inclinada',
    primaryMuscle: 'Piernas',
    secondaryMuscles: ['Glúteos'],
    description: 'Siéntate en la máquina. Coloca los pies en la plataforma. Quita los seguros y baja el peso flexionando las rodillas hasta un ángulo de 90 grados, luego empuja hasta extender casi por completo.',
    benefits: 'Permite mover mucho peso aislando las piernas sin fatigar la espalda baja.',
    level: 'Principiante',
    equipment: 'Máquina de Prensa',
  },
  {
    id: 'legs_3',
    name: 'Peso Muerto Rumano',
    primaryMuscle: 'Piernas',
    secondaryMuscles: ['Glúteos', 'Lumbares'],
    description: 'De pie sosteniendo una barra o mancuernas. Manteniendo las rodillas ligeramente flexionadas y rígidas, echa la cadera hacia atrás bajando el peso por las piernas hasta sentir estiramiento en los isquiotibiales.',
    benefits: 'Desarrollo fundamental de la cadena posterior (isquios y glúteos).',
    level: 'Intermedio',
    equipment: 'Barra o Mancuernas',
  },

  // HOMBROS
  {
    id: 'shoulders_1',
    name: 'Press Militar con Mancuernas',
    primaryMuscle: 'Hombros',
    secondaryMuscles: ['Tríceps', 'Core'],
    description: 'Siéntate en un banco con respaldo a 90 grados. Empuja las mancuernas desde la altura de los hombros hacia arriba de tu cabeza hasta casi extender los brazos.',
    benefits: 'Construye masa y fuerza en el deltoides anterior y medio.',
    level: 'Principiante',
    equipment: 'Mancuernas, Banco',
  },
  {
    id: 'shoulders_2',
    name: 'Elevaciones Laterales',
    primaryMuscle: 'Hombros',
    secondaryMuscles: ['Trapecios'],
    description: 'De pie, levanta las mancuernas hacia los lados hasta la altura de los hombros, manteniendo una ligera flexión en los codos. Controla la bajada.',
    benefits: 'Aísla el deltoides lateral, clave para dar aspecto de hombros anchos.',
    level: 'Principiante',
    equipment: 'Mancuernas',
  },

  // BRAZOS
  {
    id: 'arms_1',
    name: 'Curl de Bíceps con Barra',
    primaryMuscle: 'Brazos',
    secondaryMuscles: ['Antebrazos'],
    description: 'De pie, sujeta una barra con agarre supino (palmas hacia arriba). Manteniendo los codos pegados al cuerpo, flexiona los brazos para llevar la barra hacia el pecho.',
    benefits: 'Constructor de masa principal para los bíceps.',
    level: 'Principiante',
    equipment: 'Barra EZ o Recta',
  },
  {
    id: 'arms_2',
    name: 'Extensión de Tríceps en Polea',
    primaryMuscle: 'Brazos',
    secondaryMuscles: ['Hombro Anterior'],
    description: 'Frente a la polea alta con cuerda. Mantén los codos pegados a las costillas y extiende los brazos hacia abajo separando la cuerda al final.',
    benefits: 'Aislamiento seguro y efectivo para todas las cabezas del tríceps.',
    level: 'Principiante',
    equipment: 'Máquina de Poleas, Cuerda',
  },

  // CORE
  {
    id: 'core_1',
    name: 'Plancha Abdominal (Plank)',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Hombros', 'Glúteos'],
    description: 'Apóyate sobre los antebrazos y las puntas de los pies. Mantén el cuerpo en línea recta y el abdomen fuertemente contraído aguantando la posición.',
    benefits: 'Aumenta la fuerza isométrica y la estabilidad del cinturón abdominal.',
    level: 'Principiante',
    equipment: 'Peso Corporal, Colchoneta',
  },
  {
    id: 'core_2',
    name: 'Crunch Abdominal',
    primaryMuscle: 'Core',
    secondaryMuscles: [],
    description: 'Acuéstate boca arriba con rodillas flexionadas. Despega únicamente los hombros y parte alta de la espalda del suelo, contrayendo fuertemente el abdomen.',
    benefits: 'Enfoca el trabajo directamente en el recto abdominal (six-pack).',
    level: 'Principiante',
    equipment: 'Peso Corporal',
  }
];
