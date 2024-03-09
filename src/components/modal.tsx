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
        <p>
         <img src={pokemonseleccionado?.image} alt=""  width={250} height={250}/>
        </p>
        <h4>Centered Modal</h4>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}