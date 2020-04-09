//import api from 'axios'  

export const formatDate = (dateString) => {
  if(!dateString){
    return 'INDEFINIDO'
  }
  const date = dateString.split('-')
  const day = date[2]
  const month = date[1] 

  return `${day}/${month}`;	
}

export const formatDateFull = (dateString) => {
  if(!dateString){
    return 'INDEFINIDO'
  }
  const date = dateString.split('-')
  const day = date[2]
  const month = date[1] 
  const yaer = date[0]

  return `${day}/${month}/${yaer}`;	
}



export const diffHours = (startComplete, endComplete) => {
		
  const start = startComplete.split(':')
  const end = endComplete.split(':')

  const minuteStart = parseInt(start[0]*60) + parseInt(start[1])
  const minuteEnd = parseInt(end[0]*60) + parseInt(end[1])

  let minuteDiff = minuteEnd - minuteStart
    
  if(minuteDiff < 0){
    minuteDiff = (24*60) -minuteDiff
  }

  let hours = Math.floor( minuteDiff / 60 )
  let minutes = minuteDiff%60

  hours = hours < 9 ? `0${hours}` : hours
  minutes = minutes < 9 ? `0${minutes}` : minutes

  return `${hours}:${minutes}`
}