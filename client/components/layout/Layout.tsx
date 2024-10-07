import { Link, Outlet, useSearchParams } from "react-router-dom";
import Header from "./Header";

export default function Layout({})
{
    // Render
    return (
        <>
            <Header />

            <main id="content">

                <Outlet />

            </main>
        </>
    )
}