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
                <div className="h-screen bg-background text-foreground mytheme">
                    <Component {...pageProps} />
                </div>
            </NextUIProvider>
            <ToastContainer
                autoClose={300}
                draggable
                position="bottom-right"
                closeButton
            />
        </AuthProvider>
    );
}
