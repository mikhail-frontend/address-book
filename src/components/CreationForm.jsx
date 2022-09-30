import React, {useState, useImperativeHandle} from 'react';
import {nanoid} from "nanoid";

export const defaultForm = () => ({
    id: nanoid(10),
    email: '',
    name: '',
    password: '',
    address: '',
    city: '',
    country: '',
    acceptRules: true,
    createdAt: new Date().toLocaleDateString()
})
// BEGIN (write your solution here)
const renderRow = (key, value) => {
    return (
        <tr key={key}>
            <td>{key}</td>
            <td>{value.toString()}</td>
        </tr>
    );
};
const CreationForm = function ({addUser}, ref) {
    const [form, setFormData] = useState(defaultForm());
    const [showForm, setShowForm] = useState(true);
    useImperativeHandle(ref, () => ({
        submit: function (event) {
            submitForm(event)
        }
    }));
    const submitForm = (event) => {
        event?.preventDefault();
        const newUser = {...form, createdAt: new Date().toLocaleString()}
        if(Object.values(newUser).some(val => !val)) return;
        setFormData(newUser)
        setShowForm(false);
        addUser(newUser);
    }
    if (showForm) {
        return (
            <div>
                <h2>Добавьте нового пользователя</h2>
                <form name="myForm" onSubmit={(ev) => submitForm(ev)} ref={ref}>
                    <div className=" mb-3">
                        <label htmlFor="name" className="col-form-label">Name</label>
                        <input type="name"
                               name="name"
                               value={form.name}
                               onChange={(event) => setFormData({...form, name: event.target.value})}
                               className="form-control"
                               id="name"
                               placeholder="Name"/>
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="email" className="col-form-label">Email</label>
                        <input type="email"
                               name="email"
                               value={form.email}
                               onChange={(event) => setFormData({...form, email: event.target.value})}
                               className="form-control"
                               id="email"
                               placeholder="Email"/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password" className="col-form-label">Password</label>
                        <input type="password"
                               name="password"
                               value={form.password}
                               onChange={(event) => setFormData({...form, password: event.target.value})}
                               className="form-control"
                               id="password"
                               placeholder="Password"/>
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="address" className="col-form-label">Address</label>
                        <textarea className="form-control"
                                  value={form.address}
                                  onChange={(event) => setFormData({...form, address: event.target.value})}
                                  name="address"
                                  id="address"
                                  placeholder="1234 Main St"/>
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="city" className="col-form-label">City</label>
                        <input type="text"
                               value={form.city}
                               onChange={(event) => setFormData({...form, city: event.target.value})}
                               className="form-control"
                               name="city"
                               id="city"/>
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="country" className="col-form-label">Country</label>
                        <select id="country"
                                value={form.country}
                                onChange={(event) => setFormData({...form, country: event.target.value})}
                                name="country"
                                className="form-control">
                            <option>Choose</option>
                            <option value="argentina">Argentina</option>
                            <option value="russia">Russia</option>
                            <option value="china">China</option>
                        </select>
                    </div>
                    {/*<div className=" mb-3" >*/}
                    {/*    <div className="form-check">*/}
                    {/*        <label className="form-check-label" htmlFor="rules">*/}
                    {/*            <input id="rules"*/}
                    {/*                   checked={form.acceptRules}*/}
                    {/*                   onChange={(event) => setFormData({...form, acceptRules: event.target.checked})}*/}
                    {/*                   type="checkbox"*/}
                    {/*                   name="acceptRules"*/}
                    {/*                   className="form-check-input"/>*/}
                    {/*            Accept Rules*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <hr/>
                    <div className="btn-group ">
                        <button type={"button"}
                                className="btn btn-warning"
                                style={{marginRight: 10}}
                                onClick={() => setFormData(defaultForm())}>Reset</button>
                        {/*<button type="submit" className="btn btn-primary">Sign in</button>*/}
                    </div>
                    <hr/>
                </form>
            </div>
        )
    }
    return (
        <div>
            <button type="button"
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary">
                Back
            </button>
            <table className="table">
                <tbody>
                {Object.keys(form).sort((a, b)  => a.localeCompare(b)).map(key => {
                    return renderRow(key, form[key])
                })}
                </tbody>
            </table>
        </div>
    )

}
export default React.forwardRef(CreationForm);
// END
