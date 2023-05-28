import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Services = ({ service, isSelected, onSelect }) => {
    const handleSelect = () => {
        onSelect(service);
      };
  
      return (
        <TouchableOpacity
          style={[
            styles.container,
            isSelected && styles.selectedContainer,
            isSelected && { backgroundColor: '#43428b' },
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
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        backgroundColor: '#43428b',
      },
      selectedContainer: {
        borderColor: 'white',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
      },
      selectedTitle: {
        color: 'white',
      },
      description: {
        fontSize: 24,
      },
      selectedDescription: {
        color: 'white',
      },
    });

export default Services;
