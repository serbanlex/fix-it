import LoginScreen from '../screens/LoginScreen.js';
import SuccessfulLoginScreen from '../screens/SuccessfulLoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import NewPasswordScreen from '../screens/NewPasswordScreen.js';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import ChooseRoleScreen from '../screens/ChooseRoleScreen.js';
import RegisterOffererScreen from '../screens/RegisterOffererScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function WelcomeNavigator() {
    return (
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SuccessfulLogin" component={SuccessfulLoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterOfferer" component={RegisterOffererScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default WelcomeNavigator;