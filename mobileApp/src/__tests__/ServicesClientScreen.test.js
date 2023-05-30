import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ServicesClientScreen from '../screens/Home/ServicesClientScreen';
import { NativeBaseProvider } from 'native-base';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('ServicesClientScreen', () => {
  it('should navigate to OfferedServices screen when a service is pressed', () => {
    const { getByText } = render(
      <NativeBaseProvider>
        <ServicesClientScreen route={{ params: { name: 'categoryName' } }} />
      </NativeBaseProvider>
    );

    // Mock the navigation function
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    // Find a service item by text and press it
    const serviceItem = getByText('Service Name');
    fireEvent.press(serviceItem);

    // Expect the navigation to be called with the correct parameters
    expect(navigateMock).toHaveBeenCalledWith('OfferedServices', { item: { id: 1, name: 'Service Name' } });
  });
});