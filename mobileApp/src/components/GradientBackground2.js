import { LinearGradient } from 'expo-linear-gradient';

export default (props) => {
    return (
        <LinearGradient colors={['#ffffff', '#ffffff', '#808099']} style={{
            flex: 1,
            width: '100%',
            padding: '10%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {props.children}
        </LinearGradient>
    )
}