export type Space = {
  id: number;
  title: string;
  location: string;
  type: string;
};

const spaces: Space[] = [
  {
    id: 1,
    title: "Cancha Microfutbol y basket 1",
    location: "Sede Principal",
    type: "Cancha",
  },
  {
    id: 2,
    title: "Cancha futbol 11 - 1",
    location: "Sede Principal",
    type: "Cancha",
  },
  {
    id: 3,
    title: "Cancha tennis",
    location: "Sede Principal",
    type: "Cancha",
  },
    {
    id: 4,
    title: "Cancha Microfutbol y basket 1",
    location: "Sede Principal",
    type: "Cancha",
  },
  {
    id: 5,
    title: "Cancha futbol 11 - 1",
    location: "Sede Principal",
    type: "Cancha",
  },
  {
    id: 6,
    title: "Cancha tennis",
    location: "Sede Principal",
    type: "Cancha",
  },
  { id: 7,
    title: "Auditorio Julio Otero", 
    location: "Bloque A",
    type: "Auditorio"
  },
  { id: 8,
    title: "Auditorio Ministerio de Salud", 
    location: "Bloque A",
    type: "Auditorio"
  },
  { id: 9,
    title: "Auditorio Roque Morelo", 
    location: "Bloque A",
    type: "Auditorio"
  },
  { id: 10,
    title: "Auditorio Juan German Rosio", 
    location: "Bloque B",
    type: "Auditorio"
  },
  // Agrega más elementos aquí...
];

export default spaces;
