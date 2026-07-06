import { StyleSheet, View, Pressable, Text } from 'react-native'

type Props = {
    label: string;
};

export default function Button({ label }: Props) {
    return (
        <View style={styles.panel}>
            <Pressable style={styles.button} onPress={() => alert('A panel has been pressed.')}>
                <Text style={styles.panelLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        width: 320,
        height: 67,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    panelLabel: {
        color: '#fff',
        fontSize: 20,
    },
})