import React, { createContext } from 'react';

export const SubscriptionContext = createContext({
    isSubscriptionUpdate: false,
    setSubscriptionUpdate: (value) => {}
});