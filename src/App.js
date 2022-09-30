import React, {useState, useRef} from 'react';
import CreationForm , {defaultForm} from "./components/CreationForm";
import SortedTable from './components/SortedTable';
import {nanoid} from "nanoid";
import './assets/styles/Table.css';
import Modal from "./ui/Modal";


const Activator = ({onClick}) => {
    return (
        <button className="btn btn-primary" onClick={onClick}>Add user</button>
    )
}
function App() {
    const [users, setUsers] = useState([]);
    const [showModal, changeModal] = useState(false)
    const formEl = useRef();
    const setClearUser = ({acceptRules, ...clearUser}) => ({...clearUser});
    const setTableKeysFirst = () => {
        const [firstUser] = users;
        return Object.keys(setClearUser(firstUser || defaultForm()))
            .sort((a, b) => a.localeCompare(b))
            .map((key, index) => ({text: key, id: index, sort: ''}));
    };

    const [tableKeys, setTableKeys] = useState(setTableKeysFirst());
    const addUser = (user) => {
        setUsers([...users, {...user, id: nanoid(10)}]);
    }
    const deleteUser = ({id}) => {
        setUsers([...users.filter(user => user.id !== id)]);
    }
    const modalSubmit = () => {
        formEl.current?.submit()
    }
    return (
        <div className="App">
            <Modal positiveBtn={'Add user'}
                   negativeBtn={'Cancel'}
                   showModal={showModal}
                   Activator={users && users.length ? Activator : ''}
                   callback={modalSubmit}
            >
                <CreationForm addUser={addUser} ref={formEl}/>
            </Modal>
            <SortedTable users={users}
                         tableKeys={tableKeys}
                         setUsers={setUsers}
                         setClearUser={setClearUser}
                         deleteUser={deleteUser}
                         changeModal={changeModal}
                         setTableKeys={setTableKeys}/>


        </div>
    );
}

export default App;
