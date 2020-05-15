import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {CheckBox} from 'react-native';

export default function ListUsuario(){
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState(0);
  const [checador, setChecador] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToNew(usuario){
    navigation.navigate('DetailUsuario', {usuario});
  }

  function navigateToNew(){
    navigation.navigate('NewUsuario');
  }

  async function loadUsuarios(){
    if(loading){
      return;
    }

    if((total > 0) && (usuarios.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('usuarios', {
    });

    setUsuarios([...usuarios, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Usuario</Text>

      <View style={styles.contactBox}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => {navigateToNew()}}>
            <Text style={styles.actionText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={usuarios}
        style={styles.incidentList}
        keyExtractor={usuario => String(usuario.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadUsuarios}
        onEndReachedThreshold={0.2}
        renderItem={({item: usuario}) => (
          <View style={styles.incident}>
            
            <Text style={styles.incidentProperty}>ID:</Text>
            <Text style={styles.incidentValue}>{usuario.id}</Text>

            <Text style={styles.incidentProperty}>NOME:</Text>
            <Text style={styles.incidentValue}>{usuario.nome}</Text>

            <Text style={styles.incidentProperty}>EMAIL:</Text>
            <Text style={styles.incidentValue}>{usuario.email}</Text>

            <Text style={styles.incidentProperty}>SENHA:</Text>
            <Text style={styles.incidentValue}>{usuario.senha}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToNew(usuario)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}