async function _storeData(storageChave, storageValor){
  await AsyncStorage.setItem(storageChave, storageValor)
    .then()
    .catch(err => console.log('Deu erro pra salvar +'+ err))
};

export default _storeData();