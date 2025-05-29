export type SpaceSchedule = {
  idHorarioEspacio: number;
  idEspacio: number;
  dia: string;
  horarioInicio: string;
  horarioFin: string;
};

const space_schedule: SpaceSchedule[] = [
  {
    idHorarioEspacio: 1,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '14:00',
    horarioFin: '15:00',
  },
  {
    idHorarioEspacio: 2,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '15:00',
    horarioFin: '16:00',
  },
    {
    idHorarioEspacio: 3,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '14:00',
    horarioFin: '15:00',
  },
  {
    idHorarioEspacio: 4,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '15:00',
    horarioFin: '16:00',
  },
    {
    idHorarioEspacio: 5,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '14:00',
    horarioFin: '15:00',
  },
  {
    idHorarioEspacio: 6,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '15:00',
    horarioFin: '16:00',
  },
    {
    idHorarioEspacio: 7,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '14:00',
    horarioFin: '15:00',
  },
  {
    idHorarioEspacio: 8,
    idEspacio: 3,
    dia: 'Viernes',
    horarioInicio: '15:00',
    horarioFin: '16:00',
  },
  {
    idHorarioEspacio: 9,
    idEspacio: 3,
    dia: 'Domingo',
    horarioInicio: '16:00',
    horarioFin: '17:00',
  },
];

export default space_schedule;
