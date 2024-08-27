// react
import React, { PropsWithChildren } from 'react';
// third-party
import Head from 'next/head';

interface Props extends PropsWithChildren<{}> {}

function PageTitle(props: Props) {
    const { children } = props;
    const title = children || '';

    return (
        <Head>
            <title>
                {title}
                {title ? ' — ' : ''}
                RedParts
            </title>
        </Head>
    );
}

export default PageTitle;
