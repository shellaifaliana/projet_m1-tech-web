import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import UpdatePurchage from "./updatePurchage";
import ApiService from "../../service/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Bag = () => {
  const cartId = localStorage.getItem("cart_id");
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();
  const [reloadFlag, setReloadFlag] = useState(false);

  const handlePurchaseDeleted = () => {
    setReloadFlag(prev => !prev);
  };

  const fetchPurchases = async () => {
    try {
      const response = await ApiService.getAll(`/get_purchase/${cartId}/`);
      setPurchases(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des achats :", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [cartId, reloadFlag]);

  const handleDeleteCart = async () => {
    const response = await ApiService.put("/update_status_purchase/");
    toast.success("Thanks !!!");
    localStorage.removeItem("cart_id");
    console.log("cart_id supprimé du localStorage");
    navigate("/");
  };

  return (
    <>
      <Navbar reloadTrigger={reloadFlag} />
      <div className="w-full mt-10 px-4 lg:px-48 flex flex-col pb-32">
        <span className="text-2xl font-bold mb-6">Your Bag</span>

        <div className="flex flex-col lg:flex-row w-full">
          {purchases.length > 0 ? (
            <>
              {/* Résumé Mobile */}
              <div className="block lg:hidden mb-8">
                <div className="bg-white shadow-2xl rounded-xl border-none w-full p-6">
                  <span className="font-bold text-3xl">Summary</span>
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold">${purchases[0].cart.subtotal_sum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping and delivery</span>
                      <span className="font-bold">${purchases[0].cart.shipping_delivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-bold">${purchases[0].cart.tax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="font-bold text-red-500">-${purchases[0].cart.discount}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${purchases[0].cart.total}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteCart}
                    className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
                  >
                    Checkout →
                  </button>
                </div>
              </div>

              {/* Liste des articles */}
              <div className="flex flex-col gap-10 lg:w-2/3">
                {purchases.map((purchase) => (
                  <div key={purchase.purchase_id} className="flex gap-6">
                    <div className="md:flex-shrink-0">
                      <img
                        src={`http://localhost:8000${purchase.product.prime_image}`}
                        className="bg-gray-300 rounded-lg md:w-48"
                        alt={purchase.product.name}
                      />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <div className="flex items-center justify-between space-x-52">
                        <span className="font-bold mb-2">{purchase.product.name}</span>
                        <span className="font-bold">${purchase.product.price}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">{purchase.product.label}</span>
                      </div>
                      <div>
                        <UpdatePurchage
                          quantity={purchase.quantity}
                          purchaseId={purchase.purchase_id}
                          refresh={fetchPurchases}
                          onPurchaseDeleted={handlePurchaseDeleted}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé Desktop */}
              <div className="hidden lg:block lg:ml-36 w-full lg:w-[70vh]">
                <div className="bg-white shadow-2xl rounded-xl border-none h-[400px] p-6">
                  <span className="font-bold text-3xl">Summary</span>
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold">${purchases[0].cart.subtotal_sum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping and delivery</span>
                      <span className="font-bold">${purchases[0].cart.shipping_delivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-bold">${purchases[0].cart.tax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="font-bold text-red-500">-${purchases[0].cart.discount}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${purchases[0].cart.total}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteCart}
                    className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
                  >
                    Checkout →
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-24">
              <p className="text-2xl text-gray-600 mb-6">
                Vous devez choisir votre chaussure préférée pour continuer.
              </p>
              <NavLink to={'/product'}>
                <button
                onClick={() => navigate("/products")}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Voir les produits →
              </button>
              </NavLink>
              
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bag;
