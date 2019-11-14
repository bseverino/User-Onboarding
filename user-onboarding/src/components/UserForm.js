import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, status }) => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        status && setUserInfo(userInfo => [...userInfo, status])
    }, [status]);

    return (
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (<p>{errors.name}</p>)}

            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (<p>{errors.email}</p>)}

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (<p>{errors.password}</p>)}

            <label>
                <p>Check to accept the Terms of Service</p>
                <Field type="checkbox" name="tos" checked={values.tos} />
            </label>
            <button type="submit">Submit</button>
        </Form>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit(values, { setStatus, resetForm }){
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response))
            .finally(resetForm())
    }
})(UserForm);
export default FormikUserForm;