import ProviderRedux from '@/libs/reduxStore/Provider'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const GigLayout: React.FC<Props> = ({ children }) => {
    return (
        <ProviderRedux>{children}</ProviderRedux>
    )
}

export default GigLayout