import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import axios from 'axios';

// Interface para definir o formato dos tutoriais
interface Tutorial {
  id: number;
  nome: string;
  escola: string;
  conteudo: string; // Adicionado para incluir o conteúdo da mensagem
}

export default function AdminScreen() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null); // Armazena o ID do tutorial expandido
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:8080/api/tutorial');
      setTutorials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('🔴 Erro ao buscar tutoriais:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os tutoriais. Tente novamente mais tarde.'
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials(); // Busca os tutoriais ao carregar a tela
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id)); // Alterna entre expandido/fechado
  };

  const renderTutorial = ({ item }: { item: Tutorial }) => (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={styles.itemTitle}>{item.nome}</Text>
        <Text style={styles.itemSubtitle}>{item.escola}</Text>
      </TouchableOpacity>

      {expandedId === item.id && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>{item.conteudo}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/sicredi.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Lista de Denúncias</Text>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={tutorials}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTutorial}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    width:300,

  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#aaa',
    width:300,

  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#65C833',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width:300,

  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  dropdownContainer: {
    backgroundColor: '#f0f0f0',
    marginTop: -10,
    marginBottom: 10,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width:300,

  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    width:300,

  },
  
  logo: {
    width: 200,
    height: 100,
  },
});