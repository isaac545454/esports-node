export function convert(horas: string) {
  const [hora, minutos] = horas.split(":").map(Number)
  const minutosTotal = (hora * 60) + minutos    
  return minutosTotal
}