import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { PokemonData } from '../interfaces/pokemon';
import { MyVerticallyCenteredModal } from './modal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { url } from 'inspector';



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
  abilidad: Ability[];
  move: Move[];
  type: Type[];

}
interface Type {
  name: string;
  url: string;
}

interface Ability {
  name: string;
  url: string;
}

interface Move {
  name: string;
  url: string;
}

export interface Pokemonseleccionado{
  option: string;
  image: string;
  abilidad: Ability[];
  move: Move[];
  tipo: Type[];
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
        const pokemones = await axios.get<{ results: { name: string; url: string;}[] }>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const opcionespokemon: Option[] = [];
        const pokemonabilidades: Ability[] = [];
        const pokemonmovimientos: Move[] = [];
        const pokemontipo: Type[] = [];
        await Promise.all(pokemones.data.results.map(async (pokemon) => {
          const datapokemon = await axios.get<PokemonData>(pokemon.url);

          datapokemon.data.abilities.map(abilidad=>{
            pokemonabilidades.push({
             name: abilidad.ability.name,
             url: abilidad.ability.url,
            })
          })

          datapokemon.data.moves.map(movimiento=>{
            pokemonmovimientos.push({
              name: movimiento.move.name,
              url: movimiento.move.url
            })
          })
          
          datapokemon.data.types.map(tipo=>{
            pokemontipo.push({
              name: tipo.type.name,
              url: tipo.type.url
            })
          })

          opcionespokemon.push({
            option: datapokemon.data.name,
            image: { uri: datapokemon.data.sprites.front_default },
            abilidad: pokemonabilidades,
            move: pokemonmovimientos,
            type: pokemontipo
            
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
        image:mapeo?.image.uri ?? "",
        abilidad:mapeo?.abilidad?? [],
        move:mapeo?.move?? [],
        tipo:mapeo?.type?? [],
          })
      console.log(mapeo)
      setMustSpin(true);

    }
  };

  return (
    <>
          <div className="ruleta-container">

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
      </div>

    </>
  );
};
