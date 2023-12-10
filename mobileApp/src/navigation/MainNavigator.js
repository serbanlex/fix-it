import LoginScreen from '../screens/Authentication/LoginScreen.js';
import SuccessfulLoginScreen from '../screens/Authentication/SuccessfulLoginScreen.js';
import RegisterScreen from '../screens/Authentication/RegisterScreen.js';
import NewPasswordScreen from '../screens/Authentication/NewPasswordScreen.js';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import ChooseRoleScreen from '../screens/Authentication/ChooseRoleScreen.js';
import RegisterOffererScreen from '../screens/Authentication/RegisterOffererScreen.js';
import ServicesOffererScreen from '../screens/Home/ServicesOffererScreen.js'
import ServicesClientScreen from '../screens/Home/ServicesClientScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen.js';
import OfferedServices from '../screens/Orders/OfferedServices.js';
import OrderServiceScreen from '../screens/Orders/OrderService.js';
import OfferedServiceScreen from '../screens/Orders/OfferedService.js';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SuccessfulLogin" component={SuccessfulLoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterOfferer" component={RegisterOffererScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServicesOfferer" component={ServicesOffererScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServicesClient" component={ServicesClientScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OfferedServices" component={OfferedServices} options={{ headerShown: false }} />
            <Stack.Screen name="OfferedService" component={OfferedServiceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderService" component={OrderServiceScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default MainNavigator;