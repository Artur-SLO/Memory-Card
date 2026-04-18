export default async function RandomPokemon() {
    // const randomId = Math.floor(Math.random() * 151) + 1; // Generating a Kanto pokemon (Generation 1)
    const randomId = Math.floor(Math.random() * 1025) + 1; // Genenrating all
    const URL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    const response = await fetch(URL);
    if(response.status === 200) {
        const json = await response.json();

        let name = json.name;
        name = name.charAt(0).toUpperCase() + name.slice(1);

        let sprite = json.sprites.front_default;

        const obj = {
            name: name,
            sprite: sprite,
        }
        return obj;
    }

    throw new Error("API call failed!");
}
