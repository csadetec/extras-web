//import api from 'axios'  

export const formatDate = (dateString) => {
  const date = dateString.split('-')
  const day = date[2]
  const month = date[1] 

  return `${day}/${month}`;	
}

export const imageExists = (id) => {


  const img =  `https://visiografo.netlify.com/${id}.JPG`

  var http = new XMLHttpRequest()
  http.open('HEAD', img, false)
  http.send()
  if(http.status === 404){
    return `https://visiografo.netlify.com/generico.png`
  }
  /** */
  return img
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