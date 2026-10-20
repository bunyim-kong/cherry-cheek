import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <>
      <div className="products-container">{/* all product cards share the responsive grid */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <Footer />{/* keep the footer below and outside the product grid */}
    </>
  );
}

export default App;    
