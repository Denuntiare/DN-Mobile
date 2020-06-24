import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';
import styles from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Points = () => {
  const [Items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

    useEffect(() => {
        async function loadPosition() {
          const { status } = await Location.requestPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert('Ooops...', 'Precisamos da sua persmissão para obter a localização');
            return;
          }

          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;

          setInitialPosition([
            latitude,
            longitude,
          ]);
        }

        loadPosition();
    }, []);

    useEffect(() => {
      api.get('items').then(response => {
        setItems(response.data);
      });
    }, []);

    useEffect(() => {
      api.get('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems
        }
      }).then(response => {
        setPoints(response.data);
      })
    }, [selectedItems]);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', { point_id: id });
    }

    function handleSelectItem(id: number) {
      const alreadySelected = selectedItems.findIndex(item => item === id);

      if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== id);
        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([ ...selectedItems, id]);
      }
    }

    return (
      <>
        {/* VIEW 1 - Container */}
        <View style={styles.container}>
          {/* Botão de Voltar */}
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={20} color="#6c3c8c" />
          </TouchableOpacity>

          {/* Cabeçalho */}
          <Text style={styles.title}>Sempre Alerta!</Text>
          <Text style={styles.description}>Informe-se. E por favor nos ajude a informar ;)</Text>

          {/* Mapa */}
          <View style={styles.mapContainer}>
            { initialPosition[0] !== 0 && (
              <MapView 
                style={styles.map}
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014,
                }}
              >

                {points.map(point => (
                  <Marker
                    key={String(point.id)}
                    style={styles.mapMarker}
                    onPress={() => handleNavigateToDetail(point.id)}
                    coordinate={{
                      latitude: point.latitude,
                      longitude: point.longitude,
                    }}
                  >
                    <View style={styles.mapMarkerContainer}>
                      <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} /> 
                      <Text style={styles.mapMarkerTitle}>Denúncia</Text>
                    </View>
                  </Marker>
                ))}
              </MapView>) 
            }
          </View>
        </View>

        {/* VIEW 2 - Items Container */}
        <View 
          style={styles.itemsContainer}
        >
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 2.5 }}
          >
            {Items.map(item =>(
              <TouchableOpacity 
                key={String(item.id)} 
                style={[
                  styles.item, 
                  selectedItems.includes(item.id) ? styles.selectedItem : {}
                ]}
                onPress={() => handleSelectItem(item.id)} 
                activeOpacity={0.6}
              >
                <SvgUri width={42} height={42} uri={item.image_url}/>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    );
};

export default Points;