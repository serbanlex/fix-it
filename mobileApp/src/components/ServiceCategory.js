import { View, Text, Image, StyleSheet } from 'react-native';

const ServiceCategory = ({ category }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: category.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{category.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceCategory;
