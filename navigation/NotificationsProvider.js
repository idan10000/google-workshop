import React, { useState, useMemo, createContext } from 'react';

export const NotificationsContext = createContext({
    refreshing: true,
    setRefreshing: () => {},
    isNotification: false,
    setIsNotification: () => {},
    notifications: [],
    setNotifications: () => {}
});



// this provider helps us authentiacte the user
// created from https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app

export const NotificationsProvider = ({ children }) => {
    const [refreshing, setRefreshing] = useState(true);
    const [isNotification, setIsNotification] = useState(false);
    const [notifications, setNotifications] = useState([])

    const NotificationsContextValue = useMemo(() => [refreshing, setRefreshing, isNotification, setIsNotification, notifications, setNotifications],
        [refreshing, isNotification, notifications]);

    return (
        <NotificationsContext.Provider value={NotificationsContextValue}>
            {children}
        </NotificationsContext.Provider>
    );
};