import { Button, Input } from '@nextui-org/react';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
    const auth = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="flex h-4/6 w-5/6 flex-col justify-center rounded-lg bg-white p-8 shadow-xl md:w-2/6">
                <Image
                    className="mx-auto"
                    src="/static/logo2.png"
                    width={130}
                    height={100}
                    alt="logo"
                />
                <h2 className="mb-8 text-center text-2xl font-semibold">
                    Join Us!
                </h2>
                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Username is required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Email is required'),
                        password: Yup.string().required('Password is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (auth && auth.signUp) {
                            setSubmitting(true);
                            await auth.signUp(
                                values.username,
                                values.email,
                                values.password
                            );
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className='flex flex-col gap-y-6'>
                            <Field
                                name="username"
                                label="Username"
                                type="text"
                                as={Input}
                                placeholder="Username"
                                clearable
                                bordered
                                fullWidth
                                labelPlacement='outside'
                                isInvalid={errors.username ? true : false}
                                errorMessage={errors.username}
                            />
                            <Field
                                name="email"
                                label="Email"
                                type="email"
                                as={Input}
                                placeholder="Email"
                                clearable
                                bordered
                                fullWidth
                                labelPlacement='outside'
                                isInvalid={errors.email ? true : false}
                                errorMessage={errors.email}
                            />
                            <Field
                                name="password"
                                label="Password"
                                type={
                                    isPasswordVisible ? 'text' : 'password'
                                }
                                as={Input}
                                placeholder="Password"
                                clearable
                                bordered
                                fullWidth
                                labelPlacement='outside'
                                isInvalid={errors.password ? true : false}
                                errorMessage={errors.password}
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
                    <p className="cursor-pointer text-primary hover:underline">
                        Sign In
                    </p>
                </Link>
            </div>
        </div>
    );
}
