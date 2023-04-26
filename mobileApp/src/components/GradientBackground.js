import { LinearGradient } from 'expo-linear-gradient';

export default (props) => {
    return (
        <LinearGradient colors={['#3494E6', '#3b5998', '#EC6EAD']} style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {props.children}
        </LinearGradient>
    )
}