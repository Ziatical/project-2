const React = require('react');

// Modal Component for displaying Character details
const CharacterModal = ({ show, character, onClose }) => {
    if (!show || !character) return null; // Don't render if modal is not open

    return (
        <div className="characterModal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <img src="/assets/img/characterface.jpeg" alt="character face" className="characterFace" />
                <h3>Name: {character.name}</h3>
                <p>Race: {character.race}</p>
                <p>Hair: {character.hair}</p>
                <p>Alignment: {character.alignment}</p>
                <p>Gender: {character.gender}</p>
                <p>Skin: {character.skin}</p>
                <p>Size: {character.size}</p>
                <p>Height: {character.height}</p>
                <p>Weight: {character.weight}</p>
                <p>Faith: {character.faith}</p>
                <p>Age: {character.age}</p>
            </div>
        </div>
    );
};

export default CharacterModal;