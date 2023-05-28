import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Services = ({ service, isSelected, onSelect }) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(service);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        isSelected && { backgroundColor: '#f5f5f5' },
      ]}
      onPress={handleSelect}
    >
      <Text style={[styles.title, isSelected && styles.selectedTitle]}>{service.name}</Text>
      <Text style={[styles.description, isSelected && styles.selectedDescription]}>{service.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#8E8CE0',
    borderRadius: 8,
    marginVertical: 8,
  },
  selectedContainer: {
    borderColor: '#43428b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectedTitle: {
    color: '#43428b',
  },
  description: {
    fontSize: 18,
  },
  selectedDescription: {
    color: '#43428b',
  },
});

export default Services;
