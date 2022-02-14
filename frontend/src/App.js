import Layout from "./layouts/Layout";
import ProductList from "./pages/ProductList";
import SalesList from "./pages/SalesList";
import { Routes, Route } from "react-router-dom";
import AddArticles from "./utils/AddArticles";
import "./App.css";

function App() {
  return (
    <div className="App p-4 bg-gray-50">
      <h1 className="mb-12">Warehouse App </h1>
      {/* In order to add articles to the DB for test purposes */}
      <AddArticles></AddArticles>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="product-list" element={<ProductList />} />
          <Route path="sales" element={<SalesList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
