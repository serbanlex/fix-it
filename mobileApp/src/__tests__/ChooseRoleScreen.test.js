import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseConfigProvider } from 'native-base';
import ChooseRoleScreen from '../screens/Authentication/ChooseRoleScreen'
import "setimmediate"

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('ChooseRoleScreen', () => {
  it('should navigate to Register screen with selected role when Next button is pressed', () => {

    const navigationMock = { navigate: jest.fn() };

    const { getByText } = render(
      <NativeBaseConfigProvider>
        <ChooseRoleScreen navigation={navigationMock} />
      </NativeBaseConfigProvider>
    );

    // Click on the "Client" radio button
    fireEvent.press(getByTestId('client-radio'));

    // Click on the "Next" button
    fireEvent.press(getByText('Next'));

    // Expect the navigation to be called with the correct parameters
    expect(useNavigation().navigate).toHaveBeenCalledWith('Register', { role: 'client' });
  });
});