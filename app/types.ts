export interface Team {
    id:string;
    name: string;
    score: number;
  }
  
export interface GamePositionsScore {
    posicion: number;
    puntos: number;
    equipo: string[];
}

export function getNameTeam(color:string){
  switch(color){
    case 'Red':
      return 'Escuadrón Fénix'
    case 'Yellow':
      return 'Los Simpsons'
    case 'White':
      return 'Everest'
    case 'Green':
      return 'Green Team'
    case 'Black':
      return 'Fuera de control'
    case 'Purple':
      return 'La tribu de los capi\'s'
    case 'Orange':
      return 'Los tigres de Bengala'
    case 'Lightblue':
      return 'IM-PAC-TO'
    default:
      return color
  }
}