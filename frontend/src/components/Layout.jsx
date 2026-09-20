import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen">
            <Sidebar />
            <div className="pl-72">
                <Header />
                <main className="w-full pt-16 bg-background min-h-screen px-gutter py-gutter">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
