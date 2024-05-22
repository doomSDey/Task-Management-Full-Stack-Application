import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import "@testing-library/jest-dom";

import { useAuth } from '../src/context/AuthContext';
import SignIn from '../src/pages/signIn';

jest.mock('../src/context/AuthContext', () => ({
    useAuth: jest.fn(),
}));


jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const mockSignIn = jest.fn();

describe('SignIn component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            signIn: mockSignIn,
        });
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });
    });

    it('renders the component correctly', () => {
        render(<SignIn />);

        expect(screen.getByAltText('logo')).toBeInTheDocument();
        expect(screen.getByText('Welcome!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Join Now')).toBeInTheDocument();
    });

    it('validates the form fields', async () => {
        render(<SignIn />);

        fireEvent.click(screen.getByText('Sign In'));

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    it('toggles password visibility', () => {
        render(<SignIn />);

        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

        expect(passwordInput.type).toBe('password');

        fireEvent.click(toggleButton);

        expect(passwordInput.type).toBe('text');

        fireEvent.click(toggleButton);

        expect(passwordInput.type).toBe('password');
    });

    it('submits the form with valid data', async () => {
        render(<SignIn />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const signInButton = screen.getByText('Sign In');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        fireEvent.click(signInButton);

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password');
        });
    });

    it('displays signing in text while submitting', async () => {
        mockSignIn.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

        render(<SignIn />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const signInButton = screen.getByText('Sign In');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        fireEvent.click(signInButton);

        await waitFor(() => {
            expect(signInButton).toHaveTextContent('Signing In...');
        });

        await waitFor(() => {
            expect(signInButton).toHaveTextContent('Sign In');
        });
    });
});