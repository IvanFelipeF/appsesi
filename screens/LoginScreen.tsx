import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import api from '../http-common'; // Importa a instância configurada do Axios
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  User: undefined;
  Login: undefined;
  Admin: undefined;
  Anonymous: undefined;
};


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setErrorMessage(null); // Limpa mensagens de erro

      const requestBody = {
        username: email,
        password: password,
      };

      console.log('🟢 Requisição enviada:', requestBody);
      const response = await api.post('/api/auth/signin', requestBody);
      console.log('🟢 Resposta do backend:', response.data);

      const { roles } = response.data;

      if (roles.includes('ROLE_ADMIN')) {
        navigation.navigate('Admin');
      } else if (roles.includes('ROLE_USER')) {
        navigation.navigate('User');
      }
    } catch (error: any) {
      console.error('🔴 Erro no login:', error);

      if (error.response?.status === 403 || error.response?.status === 401) {
        setErrorMessage('Usuário ou senha incorretos.');
      } else {
        setErrorMessage('Erro ao conectar. Tente novamente.');
      }
    }
  };

  const handleAnonymousLogin = () => {
    const anonymousAccount = {
      username: 'Anonymous',
      roles: ['ROLE_USER'],
      password:'123123'
    };

    console.log('🟢 Login anônimo realizado:', anonymousAccount);
    navigation.navigate('Anonymous'); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/sicredi.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAnonymousLogin}>
          <Text style={styles.footerText}>Anônimo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 200,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#65C833',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#65C833',
    width: '50%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    top: 50,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 80,
  },
  footerText: {
    color: '#65C833',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontWeight:'bold',
    fontSize: 16,
    marginVertical: 10,
  },
});
