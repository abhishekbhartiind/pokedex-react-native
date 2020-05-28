import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native"
import Header from './components/Header'
import AddNewPokemon from './components/AddNewPokemon'
import Detail from './Detail'

const App = () => {
  const [pokemon, setPokemon] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      const pokemon = await response.json()
      setPokemon(pokemon.results)
    }
    
    fetchData();
  }, [])

  const pressHandler =  async url => {
    const response = await fetch(url)
    const selectedPokemon = await response.json()

    const pokemonDetail = {
      id: selectedPokemon.id,
      name: selectedPokemon.name,
      type: selectedPokemon.types,
      stats: selectedPokemon.stats
    }

    setSelectedPokemon(pokemonDetail)
    setModalOpen(true)
  }

  const deletePokemonCard = name => {
    const newPokemonList = pokemon.filter(pokeItem => pokeItem.name !== name)
    setPokemon(newPokemonList)
  }

  const addPokemon = (newPokemon) => {
    let newPokemonList = [newPokemon, ...pokemon]
    setPokemon(newPokemonList)
  }

  return (
    <View style={styles.container}>
      <Header/>
      <AddNewPokemon addPokemon={addPokemon}/>
      <FlatList
          columnWrapperStyle={styles.row}
          numColumns={2}
          data={pokemon}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => pressHandler(item.url)}>
              <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
      />
      {
        Object.values(selectedPokemon).length > 0
        ? (
          <Detail 
            selectedPokemon={selectedPokemon} 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen}
            deletePokeCard={deletePokemonCard}
          />
        ): null
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#13f0c5',
    fontSize: 20,
    textAlign: "center",
    textTransform: 'capitalize',
    marginHorizontal: 10,
    width: 180
  },
  row: {
    flex: 1,
    justifyContent: "center"
  },
	text: {
		fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "#cccccc"
  }
})

export default App;
