export function desconvert (min: any){
const horas = Math.floor(min / 60)
const minutos = min % 60
return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`

}