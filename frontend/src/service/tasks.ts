import { CalendarDate } from '@internationalized/date';
import Cookies from 'js-cookie';

import { apiCallWithToast } from '../helpers/commonHelpers';
const authToken = Cookies.get('authToken');

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    color: string;
    dueDate?: string | CalendarDate;
    createdAt: string;
    updatedAt: string;
}

export interface FetchTasksParams {
    startDate?: string;
    endDate?: string;
    status?: string;
    orderBy?: string;
    order?: string;
    page?: number;
    limit?: number;
    search?: string;
}

export interface FetchTasksResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    tasks: Task[];
}

export async function fetchTasks({
    startDate,
    endDate,
    status,
    orderBy = 'createdAt',
    order = 'asc',
    page = 1,
    limit = 10,
    search,
}: FetchTasksParams): Promise<FetchTasksResponse> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`;

    const queryParams = new URLSearchParams({
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(status && { status }),
        orderBy,
        order,
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
    }).toString();

    return apiCallWithToast(async () => {
        const response = await fetch(`${apiUrl}?${queryParams}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Fetching tasks failed');
        }

        return response.json();
    }, 'always1');
}

export async function createTask({
    title,
    description,
    status,
    dueDate,
    color,
}: {
    title: string;
    description: string;
    status: string;
    dueDate?: string;
    color: string;
}): Promise<Task> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/newTask`;

    let formattedDueDate = dueDate;
    if (dueDate) formattedDueDate = new Date(dueDate).toISOString();

    return apiCallWithToast(async () => {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                title,
                description,
                status,
                dueDate: formattedDueDate,
                color,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Creating task failed');
        }

        return response.json();
    }, 'always1');
}

export async function updateTask({
    taskId,
    title,
    description,
    status,
    dueDate,
    color,
}: {
    taskId: number;
    title: string;
    description: string;
    status: string;
    dueDate?: string;
    color: string;
}): Promise<Task> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}`;

    let formattedDueDate = dueDate;
    if (dueDate) formattedDueDate = new Date(dueDate).toISOString();

    return apiCallWithToast(async () => {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                title,
                description,
                status,
                dueDate: formattedDueDate,
                color,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Updating task failed');
        }

        return response.json();
    }, 'always1');
}

export async function getTasksDueToday(): Promise<Task[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/dueToday`;

    return apiCallWithToast(async () => {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Fetching tasks due today failed'
            );
        }

        return response.json();
    }, 'always1');
}

export async function deleteTasks(
    taskIds: string[]
): Promise<{ successCount: number; failureCount: number }> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/`;

    return apiCallWithToast(async () => {
        let successCount = 0;
        let failureCount = 0;

        for (const taskId of taskIds) {
            try {
                const response = await fetch(`${apiUrl}${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    failureCount++;
                } else {
                    successCount++;
                }
            } catch (error) {
                failureCount++;
            }
        }

        if (failureCount > 0) {
            throw new Error(
                `Deleted ${successCount} tasks successfully. Failed to delete ${failureCount} tasks.`
            );
        }

        return { successCount, failureCount };
    }, 'always1');
}
