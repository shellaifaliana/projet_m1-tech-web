import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import ApiService from "../../service/apiService";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CreatePurchage from "./createPurchage";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [purchageReloadFlag, setPurchaseReloadFlag] = useState(false);

  const handlePurchaseAdded = () => {
    setPurchaseReloadFlag((prev) => !prev);
  };

  const fetchProducts = async () => {
    const response = await ApiService.getAll("/get_all_product/");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const currentProduct = products[currentIndex];

  if (!currentProduct) {
    return <div className="text-center mt-10">Chargement des produits...</div>;
  }

  return (
    <>
      <Navbar reloadTrigger={purchageReloadFlag} />
      {/* Conteneur principal avec marge en haut et padding en bas pour footer */}
      <div className="mt-16 md:mt-20 mx-auto max-w-screen-lg px-4 pb-32">
        {currentProduct && (
          <div className="flex flex-col lg:flex-row lg:space-x-10">
            <div className="order-1 w-full lg:w-1/2 h-[350px] rounded-2xl mb-6 lg:mb-0">
              <img
                src={`http://localhost:8000${currentProduct.prime_image}`}
                className="w-full h-full object-cover rounded-2xl bg-gray-200"
                alt=""
              />

              <div className="flex items-center justify-center ">
                <div className="flex items-center mt-4 space-x-4 lg:space-x-48 text-2xl">
                  <button
                    onClick={handlePrev}
                    className="bg-gray-300 rounded-full"
                  >
                    <FaAngleLeft />
                  </button>

                  <div className="flex space-x-2">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentIndex === index ? "bg-black" : "bg-gray-400"
                        }`}
                      ></button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="bg-gray-300 rounded-full"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>

            <div className="order-2 bg-white shadow-2xl rounded-xl border-none w-full lg:w-[126vh] h-[400px] p-6 mt-6 lg:mt-0">
              <div>
                <span className="font-bold mb-2">{currentProduct.name}</span>
                <br />
                <span className="text-gray-400 mb-2">
                  {currentProduct.label}
                </span>{" "}
                <br />
                <span className="font-bold mb-2">${currentProduct.price}</span>
                <hr className="border-t border-gray-300 mt-8" />
              </div>
              <div className="mt-8">
                <CreatePurchage
                  productId={currentProduct.product_id}
                  onPurchaseAdded={handlePurchaseAdded}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="bg-white w-full lg:w-[126vh] h-[350px] p-6 ">
            <div>
              <span className="font-bold mb-2">Description</span>
              <br />
              <hr className="border-t border-gray-300" />
              <div className="mt-5">
                <p className="text-gray-500">{currentProduct.description}</p>
              </div>
              <div className="text-gray-500 mt-6 space-y-1">
                {currentProduct.short_description
                  .split(",")
                  .map((item, index) => (
                    <p key={index}>• {item.trim()}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[90vw] lg:w-[126vh] h-[250px] md:h-[350px] lg:h-[400px] rounded-2xl mx-auto mb-6 md:mb-10 lg:mb-0">
            <img
              src={`http://localhost:8000${currentProduct.second_image}`}
              className="w-full h-full bg-gray-200 object-cover rounded-2xl"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
