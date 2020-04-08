import api from '../service/api'
import logout from '../utils/logout'

export async function loadServices() {
  try{
    const { data } = await api.get('/services')
    localStorage.setItem('services', JSON.stringify(data))
    
  }catch(e){
    console.log(e)
    logout()
  }
}

export async function loadEmployees() {
  try{
    const { data } = await api.get('/employees')
    localStorage.setItem('employees', JSON.stringify(data))
    
  }catch(e){
    console.log(e)
    logout()
  }

}

export async function loadUsers() {
  try{
    const { data } = await api.get('/users')
    localStorage.setItem('users', JSON.stringify(data))
    
  }catch(e){
    console.log(e)
    logout()
  }

}

export async function loadProfiles() {
  try{
    const { data } = await api.get('/profiles')
    localStorage.setItem('profiles', JSON.stringify(data))
    
  }catch(e){
    console.log(e)
    logout()
  }

}

export async function loadReasons(){
  try{
    const { data } = await api.get('/reasons')
    localStorage.setItem('reasons', JSON.stringify(data))
  }catch(e){
    console.log(e)
    logout()
  }
}

export async function loadServicesEmployees(){
  try{
    const { data } = await api.get('/services/employees')
    localStorage.setItem('reports', JSON.stringify(data))
  }catch(e){
    console.log(e)
    logout()
  }
}

export async function loadLogged(id){
  try{
    const { data } = await api.get(`/users/${id}`)
    localStorage.setItem('logged', JSON.stringify(data))
  }catch(e){
    console.log(e)
    logout()
  }
}