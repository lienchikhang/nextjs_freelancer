'use client';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { setUser } from './user.slice';

interface Props {
    children: React.ReactNode,
}

const ProviderRedux: React.FC<Props> = ({ children }) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderRedux