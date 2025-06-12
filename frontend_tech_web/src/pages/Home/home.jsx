import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import { FaArrowRight } from "react-icons/fa";
import ProductList from "./productList";
import Footer from "../../Components/footer";
import { NavLink } from "react-router-dom";
import ApiService from "../../service/apiService";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAll("/get_all_product/");
      console.log("API response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSendCart = async () => {
    const existingCartId = localStorage.getItem("cart_id");

    if (existingCartId) {
      console.log("cart_id déjà existé:", existingCartId);
      return;
    }

    const response = await ApiService.post("/create_cart/");
    const cartId = response.data.cart_id;
    localStorage.setItem("cart_id", cartId);
    console.log("cart Id:", cartId);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 w-full max-w-[153vh] h-auto rounded-[20px] mt-7 mx-auto flex flex-col-reverse lg:flex-row items-center px-4 sm:px-8">
        {/* Texte */}
        <div className="p-6 lg:p-12 pt-6 lg:pt-3 w-full text-center lg:text-left flex flex-col items-center lg:items-start">
          <span className="text-3xl sm:text-4xl font-bold text-orange-600">
            25 % OFF
          </span>
          <br />
          <span className="text-4xl sm:text-5xl font-bold mb-1 block">
            Summer Sale
          </span>
          <br />
          <span className="text-gray-500 mb-6 sm:mb-8 block text-base sm:text-lg">
            Discover our summer styles with discount
          </span>
          <NavLink to="/product" className="w-full sm:w-auto">
            <button
              onClick={handleSendCart}
              className="bg-stone-950 text-white rounded-xl px-6 py-2 sm:px-9 flex items-center justify-center gap-2 hover:bg-stone-700 w-full sm:w-auto"
            >
              Shop Now <FaArrowRight className="w-5 h-5" />
            </button>
          </NavLink>
        </div>

        {/* Image */}
        <div className="mb-4 lg:mb-0">
          <img
            src="/home.png"
            alt="Promotional Banner"
            className="w-[500px] max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[560px] h-auto"
          />
        </div>
      </div>
      <div>
        <ProductList products={products} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
