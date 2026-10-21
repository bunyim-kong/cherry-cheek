import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Register from "./pages/user/Register";

export default function app() {
    return (
        <>
            <Navbar /> 
                        <ProductCard />
     
         
            <Footer />
        </>
    );
}
