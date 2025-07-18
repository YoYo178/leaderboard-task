import { createContext, useContext, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react';
import type { User } from '../types/user.types';
import { useGetAllUsersQuery } from '../hooks/network/users/useGetAllUsersQuery';
import type { AxiosError } from 'axios';
import type { ReactSetState } from "../types/react.types";

interface UsersProviderProps {
    children: ReactNode;
}

interface UsersValues {
    users: User[];
    setUsers: ReactSetState<User[]>
}

export const UsersContext = createContext<UsersValues | null>(null)

export const UsersProvider: FC<UsersProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([])
    const { data, error } = useGetAllUsersQuery({ queryKey: ['users'] });

    useEffect(() => {
        if (!data)
            return;

        setUsers(data?.data?.users || []);
    }, [data])

    if (error) {
        if ((error as AxiosError)?.response?.status === 500)
            return <div>Error!</div>
    }

    return (
        <UsersContext value={{ users, setUsers }}>
            {children}
        </UsersContext>
    )
}

export function useUsersContext() {
    const context = useContext(UsersContext);
    if (!context)
        throw new Error("[useUsersContext] Context is NULL!");

    return context;
}