import React, { useState, useEffect } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import styles from './styles';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    hora: string;
    crime: string;
    descricao: string;
    city: string;
    uf: string;
  };

  items: {
    title: string;
  }[];
}

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data );
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route. params as Params;
    
    useEffect(() => {
      api.get(`points/${routeParams.point_id}`).then(response => {
        setData(response.data);
      });
    }, []);

    function handleNavigateBack() {
        navigation.goBack(); 
    }

    if (!data.point) {
      return null;
    }

    return (
        <>
        <View style={styles.container}> 
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={20} color="#6c3c8c" />
            </TouchableOpacity>

            <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />

            <View style={styles.address}>
                <Text style={styles.addressContent}>{data.point.hora}</Text>
                <Text style={styles.addressContent}>{data.point.crime}</Text>
                <Text style={styles.addressContent}>{data.point.descricao}</Text>
            </View>

            <View style={styles.address}>
                <Text style={styles.addressTitle}>Endereço</Text>
                <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
            </View>
        </View>
        </>
    );
};

export default Detail;