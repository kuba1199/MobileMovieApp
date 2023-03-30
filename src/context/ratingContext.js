import React, { createContext } from 'react';

export const RatingContext = createContext({
    isRatingWasAdded: false,
    setRatingWasAdded: (value) => {}
});