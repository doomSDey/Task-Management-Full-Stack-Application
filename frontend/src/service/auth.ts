import { apiCallWithToast, getRandomAvatar } from '../helpers/commonHelpers';

export interface User {
    id: string;
    username: string;
    email: string;
    avatarId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthApiResponse {
    user: User;
    accessToken: string;
}

export async function logIn(
    email: string,
    password: string
): Promise<AuthApiResponse> {
    return apiCallWithToast(async () => {
        // Use the environment variable
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin/`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Authentication failed');
        }

        const data: AuthApiResponse = await response.json();
        return data;
    },'auth');
}

export async function signUp(
    username: string,
    email: string,
    password: string
): Promise<AuthApiResponse> {
    const avatarId = getRandomAvatar();
    return apiCallWithToast(async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`;

        console.log('apiUrl',apiUrl)
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, avatarId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        return response.json();
    },'auth');
}
