import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { PokemonData } from '../interfaces/pokemon';
import { MyVerticallyCenteredModal } from './modal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



interface ImagePropsLocal extends ImageProps {
  _imageHTML?: HTMLImageElement;
}

interface ImageProps {
  uri: string;
  offsetX?: number;
  offsetY?: number;
  sizeMultiplier?: number;
  landscape?: boolean;
}

interface Option {
  option: string;
  image: ImagePropsLocal;
}

export interface Pokemonseleccionado{
  option: string;
  image: string;
}

export const Ruleta: React.FC = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [escarga, setEscarga] = useState<boolean>(false);
  const [opcionpokemon, setOpcionpokemon] = useState<Option[]>([]);
  const [show, setUnshow] = useState<boolean>(false);
  const [pokemonseleccionado, setPokemonseleccionado]= useState<Pokemonseleccionado>();

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const pokemones = await axios.get<{ results: { name: string; url: string }[] }>('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
        const opcionespokemon: Option[] = [];

        await Promise.all(pokemones.data.results.map(async (pokemon) => {
          const datapokemon = await axios.get<PokemonData>(pokemon.url);
          opcionespokemon.push({
            option: datapokemon.data.name,
            image: { uri: datapokemon.data.sprites.front_default }
          });
        }));

        console.log(opcionespokemon);
        setOpcionpokemon(opcionespokemon);
      } catch (error) {
        console.error('Error al obtener información de los Pokémon:', error);
      }
    };

    if (!opcionpokemon.length) { // Verificar si opción pokemon está vacío antes de llamar obtenerInfo
      obtenerInfo();
    }
  }, [opcionpokemon]); // Solo ejecutar useEffect si opcionpokemon cambia

  const handleSpinClick = () => {
    if (!mustSpin && !!opcionpokemon.length) {
      const newPrizeNumber: number = Math.floor(Math.random() * opcionpokemon.length);
      setPrizeNumber(newPrizeNumber);
      const mapeo = opcionpokemon.find((_, i) => i == newPrizeNumber )
      setPokemonseleccionado({
        option:mapeo?.option ?? "",
        image:mapeo?.image.uri ?? ""
      })
      console.log(mapeo)
      setMustSpin(true);

    }
  };

  return (
    <>
    <div> <MyVerticallyCenteredModal pokemonseleccionado={pokemonseleccionado} show={show} onHide={() => setUnshow(false)}/>
    {/* <Button variant="primary" onClick={() => setUnshow(true)}>
        Launch vertically centered modal
      </Button> */}

     </div>
      <div>{escarga ? '' : prizeNumber}</div>
      {/* <img src={pokemonseleccionado?.image} alt="pokemon" /> */}
{/* <div>{pokemonseleccionado?.image}
</div> */}
      {opcionpokemon.length > 0 ? (
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={opcionpokemon}
          onStopSpinning={() => {

            setMustSpin(false);
            setUnshow(true)
          }}
        />
      ) : (
        <div>Cargando...</div>
      )}

      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
};
