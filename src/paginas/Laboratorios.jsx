import React from 'react'
import { HeaderMenu } from '../componentes/HeaderMenu'
import useGetListadoLaboratorios from '../hooks/useGetListadoLaboratorios'

export function Laboratorios() {

  const data = useGetListadoLaboratorios()

  return (
    <>
      <HeaderMenu />
      <main className='wrap'>
        {
          data.map(({nombre}) => {
            return(
              <p>{nombre}</p>
            )
          })
        }
      </main>
    </>
  )
}
