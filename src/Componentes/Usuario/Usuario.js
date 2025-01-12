import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";


const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const putEditUser = (id) => {
    axios.put(`${props.urlBase}${id}`, {
      name: nome ? nome : usuario.nome,
      email: email ? email : usuario.email
    },
      {
        headers: {
          "Authorization": "wesllei-brito-ozemela"
        }
      }
    ).then(() => {
      setUsuario({ ...Usuario, name: nome ? nome : usuario.name, email: email ? email : usuario.email })
      setEditar(false)
    }).catch((error) => {
      console.log(error.response)
    })
  }

  useEffect(() => {
    setNome("")
    setEmail("")
  }, [editar])

  useEffect(() => {
    axios.get(`${props.urlBase}${usuario.id}`, { headers: { Authorization: "wesllei-brito-ozemela" } })
      .then((response) => {
        setUsuario((u) => ({ ...u, email: response.data.email }))
      }).catch((error) => {
        console.log(error.response.data)
      })
  }, [])

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => putEditUser(usuario.id)}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p><strong>Nome:</strong> {usuario.name}</p>
          <p><strong>E-mail:</strong> {usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button>Excluir</button>
    </User>
  );
}

export default Usuario;
