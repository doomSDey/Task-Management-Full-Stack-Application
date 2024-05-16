import { Button, Input } from '@nextui-org/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
    const auth = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    return (
        <div className='flex h-screen flex-col items-center justify-center bg-[#f0f2f7]'>
            <div className='flex h-4/6 md:w-2/6 w-5/6 flex-col justify-center rounded-lg bg-white p-8 shadow-xl'>
                <h2 className='mb-8 text-center text-2xl font-semibold'>Welcome!</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        password: Yup.string().required('Password is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (auth && auth.signIn) {
                            setSubmitting(true);
                            await auth.signIn(values.email, values.password);
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='mb-4'>
                                <Field
                                    name='email'
                                    label="Email"
                                    type='email'
                                    as={Input}
                                    placeholder='Email'
                                    clearable
                                    bordered
                                    fullWidth
                                />
                                <ErrorMessage
                                    name='email'
                                    component='div'
                                    className='mt-1 text-red-600'
                                />
                            </div>
                            <div className='mb-6'>
                                <Field
                                    name='password'
                                    label="Password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    as={Input}
                                    placeholder='Password'
                                    clearable
                                    bordered
                                    fullWidth
                                    endContent={
                                        <button
                                            type="button"
                                            className="focus:outline-none"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {isPasswordVisible ? (
                                                <i className="bi bi-eye"></i>
                                            ) : (
                                                <i className="bi bi-eye-slash"></i>
                                            )}
                                        </button>
                                    }
                                />
                                <ErrorMessage
                                    name='password'
                                    component='div'
                                    className='mt-1 text-red-600'
                                />
                            </div>
                            <Button
                                type="submit"
                                color="primary"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="flex space-x-2 pt-8">
                <p>New here?</p>
                <Link href="/signup">
                    <p className="text-blue-500 cursor-pointer hover:underline">Join Now</p>
                </Link>
            </div>
        </div>
    );
}
