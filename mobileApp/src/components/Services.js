import { View, Text, StyleSheet } from 'react-native';

const Services = ({ service }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.description}>{service.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 24,
  },
});

export default Services;
