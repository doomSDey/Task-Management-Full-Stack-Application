import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <NextUIProvider>
                <div className="h-screen">
                    <Component {...pageProps} />
                </div>
            </NextUIProvider>
            <ToastContainer autoClose={1200} draggable position='bottom-right'/>
        </AuthProvider>
    );
}
