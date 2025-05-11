import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '../components/provider/ThemeProvider';
import AppSideBar from '../components/AppSideBar';
import { SidebarProvider } from "@/components/ui/sidebar"
import Cookies from 'js-cookie';




const Layout = () => {
     return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <SidebarProvider>

                    <AppSideBar />
                    <main className='w-full'>
                        <Navbar />
                        <section className='px-4'>
                            <Outlet />
                        </section>

                    </main>


                    <ToastContainer />
                </SidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default Layout