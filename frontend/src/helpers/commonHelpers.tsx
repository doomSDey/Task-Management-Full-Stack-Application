import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Avatars } from './commonData';

export async function apiCallWithToast<T>(
  apiCall: () => Promise<T>,
  toastId?: string
): Promise<T> {
  // Show a processing toast if toastId is not provided
  const processingToastId = toastId || toast.loading('Processing...');

  try {
    const result = await apiCall();

    toast.update(processingToastId, {
      render: 'Success!',
      type: 'success',
      isLoading: false,
      autoClose: 5000,
    });

    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Operation failed';
    toast.update(processingToastId, {
      render: errorMessage,
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    });

    throw error;
  }
}

export function getRandomAvatar(): string {
  const avatarKeys = Object.keys(Avatars);
  const randomIndex = Math.floor(Math.random() * avatarKeys.length);
  return avatarKeys[randomIndex]!;
}