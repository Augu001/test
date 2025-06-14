import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [first, setFirst] = useState(null);
  const [op, setOp] = useState(null);

  const compute = (a, operator, b) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const handlePress = (val) => {
    if (val === 'C') {
      setDisplay('0');
      setFirst(null);
      setOp(null);
      return;
    }

    if (['+', '-', '×', '÷'].includes(val)) {
      const current = parseFloat(display);
      if (op && first !== null) {
        const result = compute(first, op, current);
        setFirst(result);
      } else {
        setFirst(current);
      }
      setOp(val);
      setDisplay('0');
      return;
    }

    if (val === '=') {
      if (op && first !== null) {
        const second = parseFloat(display);
        const result = compute(first, op, second);
        setDisplay(String(result));
        setFirst(null);
        setOp(null);
      }
      return;
    }

    if (val === '.' && display.includes('.')) {
      return;
    }

    setDisplay(display === '0' ? val : display + val);
  };

  const renderButton = (val) => (
    <TouchableOpacity
      key={val}
      style={[
        styles.button,
        isOp(val) && styles.opButton,
        val === '0' && styles.zeroButton,
        val === 'C' && styles.clearButton,
      ]}
      onPress={() => handlePress(val)}
    >
      <Text style={[styles.buttonText, val === 'C' && styles.clearText]}>{val}</Text>
    </TouchableOpacity>
  );

  const isOp = (v) => ['+', '-', '×', '÷', '='].includes(v);

  const rows = [
    ['C', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.display} testID="display">{display}</Text>
      {rows.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {row.map(renderButton)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    padding: 20,
  },
  display: {
    color: '#fff',
    fontSize: 48,
    textAlign: 'right',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  opButton: {
    backgroundColor: '#f09a36',
  },
  zeroButton: {
    width: 150,
    alignItems: 'flex-start',
    paddingLeft: 28,
  },
  clearButton: {
    backgroundColor: '#a5a5a5',
  },
  clearText: {
    color: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
});
