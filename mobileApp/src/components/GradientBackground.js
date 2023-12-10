import { LinearGradient } from 'expo-linear-gradient';

export default (props) => {
    return (
        <LinearGradient colors={['#43428b', '#63618AFF', '#3c3c9f']} style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {props.children}
        </LinearGradient>
    )
}