import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from 'axios'


function App() {


  const urlBase = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/"

  const [usuarios, setUsuarios] = useState([])

  const getAllUsers = () => {

    axios.get(urlBase, {
      headers: { Authorization: "wesllei-brito-ozemela" }
    }).then((response) => {
      setUsuarios(response.data)
    }).catch((error) => {
      console.log(error.response)
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario />
      <hr />
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} urlBase={urlBase} />
      })}
    </>
  )
}

export default App;
