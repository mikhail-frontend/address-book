import React from "react";
import Modal from "../ui/Modal";

const Activator = ({onClick}) => {
    return (
        <button className="btn btn-danger" onClick={onClick}>Delete user</button>
    )
}
const SortedTable = ({users, tableKeys, setClearUser, setTableKeys, setUsers, deleteUser, changeModal}) => {
    if (!users || !Array.isArray(users) || !users.length) {
        return (
          <div style={{textAlign: "center"}}>
              <h1>
                  There is nothing here
              </h1>
              <p>
                  You can add some item
              </p>
              <button className="btn btn-primary ma" onClick={changeModal}>
                  Add user
              </button>
          </div>

        )
    }

    const sortTable = ({text}) => {
        const newKeys = tableKeys.map((key) => {
            return key.text !== text ? {...key, sort: ''} : {
                ...key,
                sort: !key.sort ? 'asc' : key.sort === 'asc' ? 'desc' : ''
            }
        });
        const currentKey = newKeys.find(key => key.text === text)
        setTableKeys(newKeys);
        const sortMapping = {
            createdAt: () => {
                if (currentKey.sort === 'asc') {
                    setUsers([...users.sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt)))])
                } else if (currentKey.sort === 'desc') {
                    setUsers([...users.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))]);
                } else {
                    setUsers(users.sort())
                }
            },
            default: () => {
                if (currentKey.sort === 'asc') {
                    setUsers([...users.sort((a, b) => a[text].localeCompare(b[text]))])
                } else if (currentKey.sort === 'desc') {
                    setUsers([...users.sort((a, b) => b[text].localeCompare(a[text]))])
                } else {
                    setUsers(users.sort())
                }
            }
        };
        sortMapping[text] ? sortMapping[text]() : sortMapping.default()

    }
    const classesListOfTH = (key) => (!key.sort || key.sort !== 'desc' ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-down rotated')
    return (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                {tableKeys.map(key => {
                    return (
                        <th scope="col"
                            onClick={() => sortTable(key)}
                            key={key.id}>
                            {key.text}
                            {key.sort ? <i className={classesListOfTH(key)}></i> : ''}
                        </th>
                    )
                })}
                <th>Delete item</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => {
                return (
                    <tr key={user.id}>
                        {Object.keys(setClearUser(user))
                            .sort((a, b) => a.localeCompare(b))
                            .map((userKey) => {
                                return (
                                    <td key={userKey}>{user[userKey]}</td>
                                )
                            })}
                        <td>
                            <Modal positiveBtn={'Yes'}
                                   negativeBtn={'Close'}
                                   Activator={Activator}
                                   callback={() => deleteUser(user)}>
                                <h2>Are you sure, that you need to delete that</h2>
                                <br/> <br/>
                            </Modal>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
export default SortedTable;