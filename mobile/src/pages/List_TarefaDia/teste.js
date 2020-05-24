// #######################################################################

var tarefasMes = [];

var date = new Date();
var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);


var agora = moment();
var finalMes = moment().endOf('month').set({
    'hour' : agora.get('hour'),
    'minute' : agora.get('minute'),
    'second' : agora.get('second'),
    'millisecond' : agora.get('millisecond')
});
//console.log(finalMes.format('DD'));
//console.log(finalMes.format('MM'))
var inicioMes = moment().startOf('month').set({
  'hour' : agora.get('hour'),
  'minute' : agora.get('minute'),
  'second' : agora.get('second'),
  'millisecond' : agora.get('millisecond')
});
//console.log(inicioMes.format('DD'));
//console.log(inicioMes.format('MM'))


function sla(){
  for (let dia = 1; dia <= finalMes.format('DD'); dia++) {
    //console.log('DIA = '+dia+' | MES = '+finalMes.format('MM'));
    addTarefasMes(dia);
  }

  for(let teste = 0; teste <= tarefasMes.length; teste++){
    console.log(tarefasMes);
    handleNewDia()
    
  }
}

async function handleNewDia(id_mes){
  const data_cadastro = moment().utcOffset('-03:00').format("LLL");
  
  const data = {
      id_mes,
      data_cadastro,
  };
  try{
    const response = await api.post('dia', data, {
          headers: {
              Authorization: id_usuario,
          }
      })   
      Alert.alert(
        "Cadastro",
        `Dia cadastrado com sucesso!`,
        [
          { text: "OK", onPress: () => _reloadListTarefaMes() }
        ],
        { cancelable: false }
      );
  }catch(err){
    console.log(err)
      Alert.alert('Cadastro', 'Erro ao cadastrar, tente novamente.');
  }
}

function addTarefasMes(dia){
  tarefasMes.push(dia);
}
// /////////////////////////////////////////////                    