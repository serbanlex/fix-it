import React from 'react';
import { Radio } from 'native-base';
import { StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-round',
    marginTop: 10,
  }
});

export default function ({onSelect}) {
  const [value, setValue] = React.useState('client');

    const handleRadioPress = (nextValue) => {
      setValue(nextValue);
      onSelect(nextValue);
    };


  return (
  <View style={styles.container}>
    <Radio.Group
      name="myRadioGroup"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
    >
      <Radio value="client" my="1" onPress={() => handleRadioPress('client')}>
        Client
      </Radio>
      <Radio value="serviceOfferer" my="1">
        Service offerer
      </Radio>
    </Radio.Group>
  </View>
  );
}