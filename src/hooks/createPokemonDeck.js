import { useEffect, useState } from "react";
import RandomPokemon from "../functions/Pokemon";

export default function usePokemonDeck(deckSize, reloadDeck) {
    const [deck, setDeck] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!deckSize) return;

        async function fetchDeck() {
            setLoading(true);

            try {
                const usedNames = new Set();
                const pokemons = [];

                while (pokemons.length < deckSize) {
                    const pokemon = await RandomPokemon();

                    if (!usedNames.has(pokemon.name)) {
                        usedNames.add(pokemon.name);
                        pokemons.push(pokemon);
                    }
                }

                setDeck(pokemons);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchDeck();
    }, [deckSize, reloadDeck]);

    return { deck, loading };
}
