import React, { useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext({});



// this provider helps us authentiacte the user
// created from https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app

export const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};
