import React, {useState, useEffect} from 'react';
import './App.css'

const App=()=> {
  const [pokemon, setPokemon] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomPokemon = data.results[randomIndex];
      const pokemonResponse = await fetch(randomPokemon.url);
      const pokemonData = await pokemonResponse.json();

      const filteredAttributes = {
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        base_experience: pokemonData.base_experience,
        sprites: pokemonData.sprites
      };

      if (Object.keys(filteredAttributes).length === 0) {
        fetchData();
      } else {
        setPokemon(filteredAttributes);
        updateHistory(filteredAttributes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateHistory = (pokemonData) => {
    setHistory([pokemonData, ...history.slice(0, 2)]);
  };

  const handleNext = () => {
    fetchData();
  };

  const handleBan = (attributeName, attributeValue) => {
    const bannedAttribute = `${attributeValue} ${attributeName}`;
    if (!banList.includes(bannedAttribute)) {
      setBanList([...banList, bannedAttribute]);
    }
  };

  const handleUnban = (bannedAttribute) => {
    setBanList(banList.filter((attribute) => attribute !== bannedAttribute));
  };

  return (
    <div className='App'>
      <div className="container">
      <div className="history-list">
          <h3>History</h3>
          <ul className='history'>
            {history.map((item, index) => (
              <li key={index}>
                <div>
                  <h4>{item.name}</h4>
                  <img src={item.sprites.front_default} alt="Pokemon" />
                  <p>Height: {item.height}</p>
                  <p>Weight: {item.weight}</p>
                  <p>Base Experience: {item.base_experience}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {pokemon && (
          <div className="pokemon-details">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt="Pokemon" />
            <ul className="attributes">
              <li onClick={() => handleBan('Height', pokemon.height)}>Height: {pokemon.height}</li>
              <li onClick={() => handleBan('Weight', pokemon.weight)}>Weight: {pokemon.weight}</li>
              <li onClick={() => handleBan('Base Experience', pokemon.base_experience)}>Base Experience: {pokemon.base_experience}</li>
            </ul>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        <div className="banned-list">
          <h3>Banned Attributes:</h3>
          <ul>
            {banList.map((attribute, index) => (
              <li key={index} onClick={() => handleUnban(attribute)}>
                {attribute}  
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App





//just for learning
 // const [pokemon, setPokemon] = useState(null);
  // const [banList, setBanList] = useState([]);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
  //     const data = await response.json();
  //     const randomIndex = Math.floor(Math.random() * data.results.length);
  //     const randomPokemon = data.results[randomIndex];
  //     const pokemonResponse = await fetch(randomPokemon.url);
  //     const pokemonData = await pokemonResponse.json();

  //     // Filter out banned abilities
  //     const filteredAbilities = pokemonData.abilities.filter((ability) => !banList.includes(ability.ability.name));
  //     // If all abilities are banned, refetch data
  //     if (filteredAbilities.length === 0) {
  //       fetchData();
  //     } else {
  //       setPokemon({ ...pokemonData, abilities: filteredAbilities });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const handleNext = () => {
  //   fetchData();
  // };

  // const handleBan = (abilityName) => {
  //   if (!banList.includes(abilityName)) {
  //     setBanList([...banList, abilityName]);
  //   }
  // };

  // const handleUnban = (abilityName) => {
  //   setBanList(banList.filter((ability) => ability !== abilityName));
  // };
  

  // return (
  //   <div className='App'>
  //   <div className="container">
  //     {pokemon && (
  //       <div className="pokemon-details">
  //         <h2>{pokemon.name}</h2>
  //         <img src={pokemon.sprites.front_default} alt="Pokemon" />
  //         <ul className="abilities">
  //           {pokemon.abilities.map((ability, index) => (
  //             <li key={index} onClick={() => handleBan(ability.ability.name)}>
  //               {ability.ability.name}
  //             </li>
  //           ))}
  //         </ul>
  //         <button onClick={handleNext}>Next</button>
  //       </div>
  //     )}
  //     <div className="banned-list">
  //       <h3>Banned Abilities:</h3>
  //       <ul>
  //         {banList.map((ability, index) => (
  //           <li key={index} onClick={() => handleUnban(ability)}>
  //             {ability}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // </div>
  // );