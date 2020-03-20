const logout = () => {
  
  localStorage.clear()
  window.location.reload()
  /** */
  console.log('error logout')
}

export default logout