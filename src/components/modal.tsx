import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PokemonData } from '../interfaces/pokemon';
import { Pokemonseleccionado } from './ruleta';


interface MyVerticallyCenteredModalProps{
    show: boolean;
    onHide: () => void
    pokemonseleccionado : Pokemonseleccionado | undefined 
}

export const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({show, onHide, pokemonseleccionado}) => {
  return (
    <Modal
      show = {show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <h1>{pokemonseleccionado?.option}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
            <table>
                <tr>
                    <td> <img src={pokemonseleccionado?.image} alt=""  width={250} height={250}/>
       </td>
                    <td><h1>habilidades</h1>
            <p>{pokemonseleccionado?.abilidad?.map(ability => ability.name).join(', ')}</p>
            <br />
           </td>
                </tr>
            </table>
             
            
        </div>
        <hr />
        <div>
    <table>
        <thead>
            <tr>
                <th>Nombre del Movimiento</th>
                <th>Tipo</th>
            </tr>
        </thead>
        <tbody>
            {pokemonseleccionado?.move?.filter((move, i) =>  i < 5).map((move, index) => (
                <tr key={index}>
                    <td>{move.name}</td>
                    <td>
                        <ul>
                            {pokemonseleccionado.tipo[index]?.name && (
                                <li key={index}>{pokemonseleccionado.tipo[index].name}</li>
                            )}
                        </ul>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}