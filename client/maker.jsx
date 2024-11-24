//Domo D
const helper = require('./helper.js');
const React = require('react');
import DomoModal from './../server/modals/DomoModal.jsx';
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const size = e.target.querySelector('#domoSize').value;
    const age = e.target.querySelector('#domoAge').value;

    if (!name || !age) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name, size, age}, onDomoAdded);
    return false;
}

const DomoForm = (props) => {
    return(
        <form id="domoForm"
            onSubmit={(e) => handleDomo(e, props.triggerReload)}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="size">Size: </label>
            <input id="domoSize" type="number" min="0" name="size" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);
    const [selectedDomo, setSelectedDomo] = useState(null);  // Track the selected Domo
    const [showModal, setShowModal] = useState(false);  // Track if modal is visible

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    const openDomo = (domo) => {
        setSelectedDomo(domo); // Set the selected Domo
        setShowModal(true); // Show the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setSelectedDomo(null); // Reset selected Domo
    };

    if (domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = domos.map(domo => {
        return (
            <div key={domo.id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoSize">Size: {domo.size}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <button className="openDomo" onClick={() => openDomo(domo)}>Open Domo</button>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
            <DomoModal show={showModal} domo={selectedDomo} onClose={closeModal} />
        </div>
    );
};

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;