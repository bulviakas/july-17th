import { StyleSheet, View, Pressable, Text } from 'react-native'

type Props = {
    label: string;
    onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {
    return (
        <View style={styles.panel}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.panelLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        width: 250,
        height: 120,
        backgroundColor: '#81021f',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 20,
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    panelLabel: {
        color: '#fcf2d9',
        fontSize: 24,
    },
})