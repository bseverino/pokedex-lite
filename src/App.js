import React, { useState, useEffect } from 'react';
import './App.css';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

function App() {
  const [pokemon, setPokemon] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    var interval = {
      limit: 806,
      offset: 0
    };

    P.getPokemonsList(interval)
    .then(function(res) {
      setPokemonList(res.results);
    })
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchResult(searchTerm);
    setSearchTerm('');
  };

  if (searchResult) {
    P.getPokemonByName(searchResult.toLowerCase())
      .then(function(res) {
        setPokemon(res);
      })
      .catch(function(err) {
        alert('There is no Pokemon with this name!');
        console.log(err);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type='text' value={searchTerm} onChange={handleChange} />
        <button>Search</button>
      </form>
      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          {pokemon.types.map(item => (
            <p key={item.slot}>{item.type.name}</p>
          ))}
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : null}
      <div>
        {pokemonList.map(item => (
          <div key={item.name}>
            <p onClick={() => {
              setSearchResult(item.name);
              setSearchTerm('');
            }}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
