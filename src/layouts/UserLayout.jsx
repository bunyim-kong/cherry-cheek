import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import AuthCartPrompt from "../components/AuthCartPrompt";
import "./UserLayout.css";

function UserLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="user-main flex-1">
                <Outlet />
            </main>

            <Footer />
            <AuthCartPrompt />
        </div>
    )
}

export default UserLayout;
