import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { UserCheck } from '../lib/User.ts'
import type { User } from "../generated/prisma/client";

export const UserContext = createContext(undefined)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const userState = useState<User | null>(undefined)
    const [, setUser] = userState;

    useEffect(() => {
        UserCheck(setUser)
    }, [])

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const userState = useContext(UserContext)

    return userState;
}
