import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
    return (
        <>
            <Head>
                <title>{title || "Recipt platform"}</title>
                <meta
                    name="description"
                    content={`The best recipt in the world. ${description || ''}`}
                />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={keywords || 'Recipt, tasty, deliciously'} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    );
};



export default MainLayout;
