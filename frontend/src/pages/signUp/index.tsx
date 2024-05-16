import { Button, Input } from '@nextui-org/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
    const auth = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[#f0f2f7]">
            <div className="flex h-4/6 md:w-2/6 w-5/6 flex-col justify-center rounded-lg bg-white p-8 shadow-xl">
                <h2 className="mb-8 text-center text-2xl font-semibold">Join Us!</h2>
                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Username is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        password: Yup.string().required('Password is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (auth && auth.signUp) {
                            setSubmitting(true);
                            await auth.signUp(values.username, values.email, values.password);
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full">
                            <div className="mb-4">
                                <Field
                                    name="username"
                                    label="Username"
                                    type="text"
                                    as={Input}
                                    placeholder="Username"
                                    clearable
                                    bordered
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="mt-1 text-red-600"
                                />
                            </div>
                            <div className="mb-4">
                                <Field
                                    name="email"
                                    label="Email"
                                    type="email"
                                    as={Input}
                                    placeholder="Email"
                                    clearable
                                    bordered
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="mt-1 text-red-600"
                                />
                            </div>
                            <div className="mb-6">
                                <Field
                                    name="password"
                                    label="Password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    as={Input}
                                    placeholder="Password"
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
                                    name="password"
                                    component="div"
                                    className="mt-1 text-red-600"
                                />
                            </div>
                            <Button
                                type="submit"
                                color="primary"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="flex space-x-2 pt-8">
                <p>Already have an account?</p>
                <Link href="/signIn">
                    <p className="text-blue-500 cursor-pointer hover:underline">Sign In</p>
                </Link>
            </div>
        </div>
    );
}
