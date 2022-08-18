import React, { useState, useContext, createContext } from 'react'
import axios from "@plugins/axios"

const authContext = createContext(null);

export function AuthProvider({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}> {children} </authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {

    const [user, setUser] = useState(null)

    const signIn = async (username: string, password: string) => {
        console.log('Signing in', username)

        const res = await axios.post('/login', {})

        if (res.status === 200) {
            console.log(res.data)
            localStorage.setItem('token', res.data['token'])
            getUser(res.data['token'])
        }
    }

    const signOut = async () => {
        console.log('Signing out')
        localStorage.removeItem('token')
        setUser(null)
    }

    const getUser = async (token?: string) => {
        const authToken = token ? token : localStorage.getItem('token')

        const res = await axios.get('/user', { headers: { 'Authorization': `Bearer ${authToken}` } })

        if (res.status === 200) {
            setUser(res.data)
        }
    }

    return [user, signIn, signOut, getUser]
}
