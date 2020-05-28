import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import Modal from "modal-react-native-web";

const Detail = props => {
    let pokemon = props.selectedPokemon

    const deletePokecard = name => {
        props.deletePokeCard(name)
        props.setModalOpen(false)
    }

    return (
        <View style={styles.modalContainer}>
            <Modal
                visible={props.modalOpen} 
                animationType='slide'
            >
                <View
                    style={styles.modalContent}
                >
                <Text style={styles.title}>
                    {`Rank ${pokemon.id}`}
                </Text>
                <Text 
                    style={styles.title}
                >
                    {pokemon.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.subTitle}>Attacts</Text>
                    {
                        pokemon.type.length > 0 
                        ? pokemon.type.map((pType, ix) => (
                            <View key={ix}>
                                <Text>{`${ix+1}. ${pType.type.name}`}</Text>
                            </View>
                        ))
                        : null
                    }
                </View>
                <View style={styles.details}>
                    <Text style={styles.subTitle}>Stats</Text>
                    {
                        pokemon.stats.length > 0 
                        ? pokemon.stats.map((pStat, ix) => (
                        <View key={ix}>
                            <Text>
                            {`${pStat.stat.name} : ${pStat.base_stat}`}
                            </Text>
                        </View>
                        ))
                        : null
                    }
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => props.setModalOpen(false)}
                    >
                        <View style={styles.button}>
                            <Text>Close</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deletePokecard(pokemon.name)}
                    >
                        <View style={styles.button}>
                            <Text>Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        borderBottomColor: 'black',
        marginBottom: 5,
        borderBottomWidth: 2,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    details: {
        borderColor: 'gray',
        borderWidth: 2,
        padding: 10,
        margin: 10,
        width: 200
    },
    subTitle: {
        borderBottomColor: 'red',
        marginBottom: 5,
        borderBottomWidth: 2,
        fontSize:16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    }
})

export default Detail