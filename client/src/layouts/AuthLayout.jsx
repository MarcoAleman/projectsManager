import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center">
                <div>
                    <Outlet />
                </div>
            </main>
        </>
    )
}