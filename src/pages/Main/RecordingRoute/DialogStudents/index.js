import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

export default function DialogStudents({visible, onSubmit, onCancel}) {
  const [amount, setAmount] = useState('');

  return (
    <Dialog.Container visible={visible} useNativeDriver>
      <Dialog.Title>Nova Parada</Dialog.Title>
      <Dialog.Description>Informe a quantidade de alunos dessa parada:</Dialog.Description>
      <Dialog.Input placeholder="Quantidade" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Dialog.Button label="Cancelar" onPress={onCancel} />
      <Dialog.Button
        label="Confirmar"
        onPress={() => {
          onSubmit(amount);
          setAmount('');
        }}
      />
    </Dialog.Container>
  );
}
