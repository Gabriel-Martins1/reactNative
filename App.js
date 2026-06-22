import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [leitura, setLeitura] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(50);

    const inscricao = Accelerometer.addListener(setLeitura);
    return () => inscricao.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensor ativo</Text>
      <Text style={styles.eixoX}>Eixo X: {leitura.x.toFixed(2)}</Text>
      <Text style={styles.eixoY}>Eixo Y: {leitura.y.toFixed(2)}</Text>
      <Text style={styles.eixoZ}>Eixo Z: {leitura.z.toFixed(2)}</Text>
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
});