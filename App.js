import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const calcularMaiorEixo = (leitura) => {
  const absX = Math.abs(leitura.x);
  const absY = Math.abs(leitura.y);
  const absZ = Math.abs(leitura.z);

  if (absX >= absY && absX >= absZ) return 'X';
  if (absY >= absX && absY >= absZ) return 'Y';
  return 'Z';
};

export default function App() {
  const [leitura, setLeitura] = useState({ x: 0, y: 0, z: 0 });
  const [ativo, setAtivo] = useState(false);
  const inscricaoRef = useRef(null);

  const iniciarLeitura = () => {
    Accelerometer.setUpdateInterval(50);
    inscricaoRef.current = Accelerometer.addListener(setLeitura);
    setAtivo(true);
  };

  const pararLeitura = () => {
    if (inscricaoRef.current) {
      inscricaoRef.current.remove();
      inscricaoRef.current = null;
    }
    setAtivo(false);
  };

  const alternarLeitura = () => {
    ativo ? pararLeitura() : iniciarLeitura();
  };

  const maiorEixo = calcularMaiorEixo(leitura);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensor {ativo ? 'ativo' : 'pausado'}</Text>

      <Text style={[styles.eixoX, maiorEixo === 'X' && styles.destaque]}>
        Eixo X: {leitura.x.toFixed(2)}
      </Text>
      <Text style={[styles.eixoY, maiorEixo === 'Y' && styles.destaque]}>
        Eixo Y: {leitura.y.toFixed(2)}
      </Text>
      <Text style={[styles.eixoZ, maiorEixo === 'Z' && styles.destaque]}>
        Eixo Z: {leitura.z.toFixed(2)}
      </Text>

      <Text style={styles.indicador}>Maior força no eixo: {maiorEixo}</Text>

      <Button title={ativo ? 'Parar' : 'Retomar'} onPress={alternarLeitura} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  eixoX: { fontSize: 20, color: '#00F0FF' },
  eixoY: { fontSize: 20, color: '#FF003C' },
  eixoZ: { fontSize: 20, color: '#FFF000' },
  destaque: { fontWeight: 'bold', textDecorationLine: 'underline' },
  indicador: { fontSize: 18, marginTop: 15, marginBottom: 15, fontStyle: 'italic' },
});