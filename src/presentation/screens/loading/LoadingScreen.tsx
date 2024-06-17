import { Layout, Spinner } from '@ui-kitten/components'
import React from 'react'
import { styles } from '../../theme/styles'


export const LoadingScreen = () => {
    return (
        <Layout style={styles.loading}>
            <Spinner status='primary' size='medium' />
        </Layout>
    )
}
