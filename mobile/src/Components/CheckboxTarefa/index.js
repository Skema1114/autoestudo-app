// Então o que temos é uma lista de todos e cada todo tem uma propriedade se está concluído ou não.
// Se você quer controlar o estado de um único Todo, você precisa componentizar ele.
// src/components/Todo/index.js
import React, {useState, useEffect} from 'react'

// O Component Todo irá receber a propriedade data, que será todas as informações que virão da api referente ao único Todo
export default function Todo({ data }) {
  // Aqui eu estou criando uma variável de estado para armazenar se esse Todo está concluído. Esse estado receberá um boolean para lidar melhor com o checkbox
  const [status, setStatus] = useState()

  const handleChangeStatus = () => {
    // A cada vez que essa função for chamada, pelo fato da variável status ser um boolean, o novo valor sempre será o valor contrário do que está. Se estiver True, o novo valor será False.
    // Aqui você pode fazer a sua chamada API para alterar o valor status do Todo

    setStatus(!status)
  }
  
  // Aqui eu estou usando um useEffect para que ao renderizar esse componente, ele calcule se esse Todo está concluído e armazena isso na variável isCompleted
  useEffect(() => {
    if (data.status === "arguardando") {
      setStatus(false)
    } else {
      setStatus(true)
    }
  }, [])
  
  // Esse checkbox é um fake, não sei de qual biblioteca você está utilizando então digamos que ele recebe o Status, que vai indicar se ele está checado ou não, e uma função onPress, que será acionada com ele for pressionado
  return <Checkbox status={status} onPress={handleChangeStatus}/>
}