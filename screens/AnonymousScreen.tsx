import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import axios from 'axios'; // Certifique-se de importar corretamente o Axios
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  User: undefined;
  Login: undefined;
  Admin: undefined;
  Anonymous: undefined;
};


type AnonymousScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Anonymous'>;

type Props = {
  navigation: AnonymousScreenNavigationProp;
};

export default function AnonymousScreen({ navigation }: Props) {
  const [escola, setEscola] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handleEnviar = async () => {
    if (!escola.trim() || !conteudo.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos antes de enviar.');
      return;
    }

    const payload = {
      nome: 'Anônimo', // Nome fixo para contas anônimas
      escola: escola.trim(), // Remove espaços extras
      conteudo: conteudo.trim(), // Remove espaços extras
    };

    try {
      console.log('🟢 Enviando payload:', JSON.stringify(payload));

      const response = await axios.post(
        'http://192.168.1.3:8080/api/tutorial', // Substitua pela URL correta
        payload,
        {
          headers: {
            'Content-Type': 'application/json', // Define o tipo correto de conteúdo
          },
        }
      );

      console.log('🟢 Tutorial enviado com sucesso:', response.data);
      Alert.alert('Sucesso', 'Tutorial criado com sucesso!');
      
      // Limpa os campos após o envio
      setEscola('');
      setConteudo('');
    } catch (error) {
      console.error('🔴 Erro ao enviar tutorial:', error);
      Alert.alert('Erro', 'Não foi possível enviar o tutorial.');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.Title}>Todos contra o bullying</Text>
        <Image
        source={require('../assets/sicredi.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Campo para "escola" */}
      
      <TextInput
        style={styles.input}
        placeholder="Colégio"
        placeholderTextColor="#aaa"
        value={escola}
        onChangeText={setEscola}
      />

      {/* Campo para "conteúdo" */}
      <TextInput
        style={styles.textArea}
        placeholder="Faça sua denúncia de bullying..."
        placeholderTextColor="#aaa"
        value={conteudo}
        multiline
        numberOfLines={5}
        onChangeText={setConteudo}
      />

      {/* Botão de Enviar */}
      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#65C833',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    width:300,

  },
  textArea: {
    borderWidth: 1,
    borderColor: '#65C833',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 150,
    width:300,
    textAlignVertical: 'top', // Alinha o texto ao topo
  },
  button: {
    backgroundColor: '#65C833',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width:300,

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 100,
    bottom:70
  },
  Title:{
    fontSize: 18,
    fontWeight: 'bold',
    top:50,
    color:'#65C833'

  }
});
