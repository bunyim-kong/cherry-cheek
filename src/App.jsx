import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <>
      {/* Keep every product card directly inside the responsive grid. */}
        <ProductCard />


      {/* The footer follows the grid as a sibling, not as a grid item. */}
      <Footer />
    </>
  );
}

export default App;    
