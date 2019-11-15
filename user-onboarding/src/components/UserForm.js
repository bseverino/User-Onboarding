import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import UserEntry from './UserEntry';

const UserForm = ({ values, errors, touched, status }) => {
    const [userInfo, setUserInfo] = useState([]);
    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        status && setUserInfo(userInfo => [...userInfo, status]);
    }, [status]);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className='form-container'>
            <Form>
                <Field type='text' className='text-input' name='name' placeholder='Name' />
                {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}
    
                <Field type='text' className='text-input' name='email' placeholder='Email' />
                {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
    
                <Field type='password' className='text-input' name='password' placeholder='Password' />
                {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
    
                <Field as='select' className='text-input' name='role'>
                    <option value=''>Role</option>
                    <option value='UI Developer'>UI Developer</option>
                    <option value='UX Designer'>UX Designer</option>
                    <option value='Front End Engineer'>Front End Engineer</option>
                    <option value='Back End Engineer'>Back End Engineer</option>
                    <option value='Data Scientist'>Data Scientist</option>
                </Field>
                {touched.role && errors.role && (<p className='error'>{errors.role}</p>)}

                <label>                    
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    <p>Check to accept the Terms of Service</p>
                </label>
                {touched.tos && errors.tos && (<p className='error-tos'>{errors.tos}</p>)}

                <button type='submit' value='submit'>Submit</button>                
            </Form>
            <UserEntry userInfo={userInfo} activeTab={activeTab} toggle={toggle} />       
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, role, tos }){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name is too short')
            .max(30, 'Name is too long')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .min(2, 'Password is too short')
            .required('Password is required'),
        role: Yup.string()
            .required('Role is required'),
        tos: Yup.boolean()
            .oneOf([true], 'You must accept the Terms of Service')
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