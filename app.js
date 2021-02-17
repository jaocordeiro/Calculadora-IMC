import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {
  //VALORES GLOBAIS DO APP
  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indetermindo',
    cor: '#A9A9A9',
  }

  calcularIMC = () => {
    const resultado = 
      this.state.peso / (this.state.altura * this.state.altura);

    // Math.ceil é uma biblioteca do JS para aredondar os números
    // Neste caso arredonadar o resultado do IMC
    this.setState({
      imc: Math.ceil(resultado)
    });

    if(resultado < 18.5) {
      this.setState ({
        legenda: 'Magreza',
        cor: '#FF8C00'
      });
    } else if (resultado >= 18.5 && resultado < 25) {
      this.setState ({
        legenda: 'Normal',
        cor: '#00CD00'
      });
    } else if (resultado >= 25 && resultado < 30) {
      this.setState ({
        legenda: 'Sobrepeso',
        cor: '#FFA500'
      });
    } else if (resultado >= 30 && resultado < 35) {
      this.setState ({
        legenda: 'Obesidade grau I',
        cor: '#FF4500'
      });
    } else if (resultado >= 35 && resultado < 40) {
      this.setState ({
        legenda: 'Obesidade grau II (Severa)',
        cor: '#FF0000'
      });
    } else if (resultado >= 40) {
      this.setState ({ 
        legenda: 'Obesidade grau III (Mórbida)',
        cor: '#CD0000'
      });
    }

  }

  render() {
    return (
      <View style={styles.app}>
        <Text style={styles.legenda}>Seu IMC</Text>

        <View style = {[styles.painel, {backgroundColor: this.state.cor}]}>
          <Text style={styles.resultado}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.legenda}</Text>
        </View>

        <View>
          <TextInput 
            style={styles.peso} 
            label= "Peso"
            onChangeText = {valor => {
              this.setState({peso: valor.replace(',', '.')});
            }}
          />
          <TextInput 
            style={styles.altura}
            label= "Altura"
            onChangeText = {valor => {
              this.setState({altura: valor.replace(',', '.')});
            }} 
          />
          <Button style={styles.botao} mode = "contained" onPress = {this.calcularIMC}>
            Calcular
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    app: {
      backgroundColor: '#000000',
      padding: 400,
      paddingTop: 80,
      paddingHorizontal: 10,
    },
    painel:{
      alignSelf: 'center',
      borderRadius: 10,
      width: 150,
      marginVertical: 20,
      padding: 12,
    },
    legenda: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    resultado: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      paddingTop: 5,
    },
    diagnostico: {
      textAlign: 'center',
      fontSize: 17,
    },
    peso: {
      marginVertical: 15,
      marginHorizontal: 30,
      borderRadius: 15,
    },
    altura: {
      marginVertical: 20,  
      marginHorizontal: 30,
      borderRadius: 15,
    },
    botao: {
      padding: 10,
      marginVertical: 20,  
      marginHorizontal: 100,
      borderRadius: 20,
    }
});
