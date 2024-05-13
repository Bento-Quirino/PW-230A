// Função para fazer uma requisição GET para a API usando async/await
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        // Verifica se a resposta da API está OK (status 200)
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados do Pokémon.');
        }

        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error('Erro ao obter dados do Pokémon:', error);
        return null;
    }
}

// Função para exibir os dados do Pokémon na página
async function displayPokemonData(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const pokemonNameInput = document.getElementById('pokemon-name');
    const pokemonName = pokemonNameInput.value.toLowerCase(); // Obtém o nome do Pokémon digitado

    const pokemonInfoDiv = document.getElementById('pokemon-info');
    pokemonInfoDiv.innerHTML = ''; // Limpa o conteúdo anterior

    // Chama a função para obter os dados do Pokémon
    const pokemonData = await fetchPokemonData(pokemonName);

    // Verifica se os dados foram obtidos com sucesso
    if (pokemonData) {
        console.log('Dados do Pokémon:', pokemonData);

        // Cria elementos HTML para exibir os dados do Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemonData.sprites.front_default;
        pokemonImage.alt = pokemonName;
        pokemonInfoDiv.appendChild(pokemonImage);

        const pokemonNameElement = document.createElement('h2');
        pokemonNameElement.textContent = pokemonName;
        pokemonInfoDiv.appendChild(pokemonNameElement);

        const pokemonAbilitiesList = document.createElement('ul');
        pokemonData.abilities.forEach(ability => {
            const abilityItem = document.createElement('li');
            abilityItem.textContent = ability.ability.name;
            pokemonAbilitiesList.appendChild(abilityItem);
        });
        pokemonInfoDiv.appendChild(pokemonAbilitiesList);
    } else {
        console.log('Não foi possível obter os dados do Pokémon.');
    }
}

// Vincula a função de exibir os dados do Pokémon ao evento de submit do formulário
const pokemonForm = document.getElementById('pokemon-form');
pokemonForm.addEventListener('submit', displayPokemonData);
