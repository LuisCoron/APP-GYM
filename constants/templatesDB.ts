export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  icon: any; // using any for IconSymbol name type compatibility
  exercises: {
    id: string;
    name: string;
    defaultSets: number;
  }[];
};

export const TEMPLATES_DB: TemplateDefinition[] = [
  {
    id: 'tpl_torso',
    name: 'Día de Torso',
    description: 'Enfocado en pecho, espalda y hombros.',
    icon: 'figure.strengthtraining.traditional',
    exercises: [
      { id: 'chest_1', name: 'Press de Banca con Barra', defaultSets: 4 },
      { id: 'back_1', name: 'Dominadas (Pull-ups)', defaultSets: 4 },
      { id: 'shoulders_1', name: 'Press Militar con Mancuernas', defaultSets: 3 },
      { id: 'back_2', name: 'Remo con Barra', defaultSets: 3 },
    ]
  },
  {
    id: 'tpl_piernas',
    name: 'Día de Piernas',
    description: 'Desarrollo completo del tren inferior.',
    icon: 'figure.walk',
    exercises: [
      { id: 'legs_1', name: 'Sentadilla Libre', defaultSets: 4 },
      { id: 'legs_2', name: 'Prensa Inclinada', defaultSets: 3 },
      { id: 'legs_3', name: 'Peso Muerto Rumano', defaultSets: 3 },
      { id: 'core_1', name: 'Plancha Abdominal (Plank)', defaultSets: 3 },
    ]
  },
  {
    id: 'tpl_fullbody',
    name: 'Cuerpo Completo',
    description: 'Rutina general para todo el cuerpo.',
    icon: 'flame.fill',
    exercises: [
      { id: 'legs_1', name: 'Sentadilla Libre', defaultSets: 3 },
      { id: 'chest_1', name: 'Press de Banca con Barra', defaultSets: 3 },
      { id: 'back_3', name: 'Jalón al Pecho', defaultSets: 3 },
      { id: 'shoulders_2', name: 'Elevaciones Laterales', defaultSets: 3 },
      { id: 'arms_1', name: 'Curl de Bíceps con Barra', defaultSets: 2 },
    ]
  }
];
