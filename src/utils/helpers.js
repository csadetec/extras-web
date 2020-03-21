export const formatDate = (dateString) => {
  const date = dateString.split('-')
  const day = date[2]
  const month = date[1] 

  return `${day}/${month}`;	
}

export const imageExists = (id) => {

	if(!id)return ;
  const img =  `https://visiografo.netlify.com/${id}.JPG`

  var http = new XMLHttpRequest()
  http.open('HEAD', img, false)
  http.send()
  if(http.status === 404){
    return `https://visiografo.netlify.com/generico.png`
  }
  
  return img
}