import React, { useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"
import Modal from "modal-react-native-web";

const AddNewPokemon = props => {
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonRank, setPokemonRank] = useState(0)


    const savePokemon = () => {
        let pokemonObject = {
            name: pokemonName,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonRank}/`
        }
        props.addPokemon(pokemonObject)
        setAddModalOpen(false)
    }

    return (
        <View style={styles.addContainer}>
            <TouchableOpacity
                onPress={() => setAddModalOpen(true)}
            >
                <Text style={styles.addButton}>
                Add New Pokemon
                </Text>
            </TouchableOpacity>
            <Modal
                visible={addModalOpen}
                animationType='slide'
            >
                <View style={styles.addContainer}>
                    <Text>Pokemon Name</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Pokemon Name"
                        onChangeText={(val) => setPokemonName(val)}
                    />

                    <Text>Pokemon Rank</Text>
                    <TextInput 
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="Enter Pokemon Rank"
                        onChangeText={(val) => setPokemonRank(val)}
                    />

                    <TouchableOpacity
                        onPress={() => savePokemon()}
                    >
                        <Text style={styles.addButton}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setAddModalOpen(false)}
                    >
                        <Text style={styles.addButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    input:{
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200
    },
    addContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AddNewPokemon