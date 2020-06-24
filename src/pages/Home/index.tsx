import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Home = () => {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [KeyboardShow, setKeyboardShow] = useState(false);
    const navigation = useNavigation();

    const _keyboardDidShow = () => {
      // alert("Keyboard Show");
      setKeyboardShow(true);
    };
  
    const _keyboardDidHide = () => {
      // alert("Keyboard Hidden");
      setKeyboardShow(false);
    };

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  
      // cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }, []);

    function handNavigationToPoints() {
      navigation.navigate('Points', {
        uf,
        city,
      });
    }

    return  (
      <KeyboardAvoidingView style={{flex: 1}} behavior={ Platform.OS === 'ios' ? "padding" : undefined}>
        <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/home-background.jpeg')} 
          style={styles.container}
          imageStyle={{ width: 360, height: 480 }}
          >
          <View 
            style={
            KeyboardShow && styles ?
            {marginBottom: 32}:
            {flex: 1, justifyContent: 'center',}
            }
          >
            <Image source={require('../../assets/logo.jpeg')} />
            {/* <Text style={styles.h1}>Denuntiare</Text>
             */}
            <View>
              <Text style={styles.h2}>Faça um Denuntiare!</Text>
              <Text style={styles.h3}>Buscando Caminhos seguros e denuncias rápidas</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TextInput 
              style={styles.input}
              placeholder="Digite a UF"
              value={uf}
              maxLength={2}
              autoCapitalize="characters"
              autoCorrect={false}
              onChangeText={setUf}
              onSubmitEditing={Keyboard.dismiss}
            />

            <TextInput 
              style={styles.input}
              placeholder="Digite a cidade"
              value={city}
              autoCorrect={false}
              onChangeText={setCity}
              onSubmitEditing={Keyboard.dismiss}
            />

            <RectButton style={styles.button} onPress={handNavigationToPoints}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
          </View>
        </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
};

export default Home;