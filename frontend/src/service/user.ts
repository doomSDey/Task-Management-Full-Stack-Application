import Cookies from 'js-cookie';

import { User } from './auth';
import { apiCallWithToast } from '../helpers/commonHelpers';

export interface UpdateAvatarResponse {
    message: string;
    user: User;
}

const authToken = Cookies.get('authToken');

export async function updateUserAvatar(
    avatarId: string
): Promise<UpdateAvatarResponse> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/avatar`;

    return apiCallWithToast(async () => {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ avatarId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Updating avatar failed');
        }

        return response.json();
    }, 'always1');
}
