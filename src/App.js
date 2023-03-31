import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";


function App() {
  const [usuarios, setUsuarios] = useState([])

  

  const getAllUsers = () => {

    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"

    axios.get(url, {
      headers: {"Authorization": "wesllei-brito-ozemela"}
    }).then((result) => {
     setUsuarios(result.data)
      
    }).catch((error) => {
      console.log(error.response)
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    console.log(usuarios)
  }, [usuarios])
  
  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario />
      <hr/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} getAllUsers={getAllUsers}/>
      })}
    </>
  )
}

export default App;
