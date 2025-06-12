import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ApiService from "../service/apiService";

const Navbar = ({reloadTrigger}) => {
  const cartId = localStorage.getItem("cart_id");
  const [nbPurchase, setNbPurchase] = useState(0);


  const fetchNbPurchase = async () => {
      try {
        const response = await ApiService.getAll(`/get_purchase/${cartId}/`);
        const PurchaseData = response.data;
        setNbPurchase(PurchaseData.length);
      } catch (error) {
        console.error(
          "erreur lors de la récupération des nombre de purchase:",
          error
        );
      }
    };

  useEffect(() => {
    fetchNbPurchase();
  }, [reloadTrigger]);

  return (
    <div className=" bg-white border-b-2 border-gray">
      <nav className="max-w-screen-lg mx-auto flex items-center justify-between p-3">
        <div className="flex items-center text-black">
          <img src="/icon.svg" className="h-8 mr-2" />
          <span className="font-sans tracking-tight">SUN CO.</span>
        </div>
        <NavLink
          to={"/bag"}
          className="border border-black rounded-lg px-4 py-0 flex items-center space-x-2 relative"
        >
          <img src="/panier2.jpg" alt="" className="h-9" />
          <div className="relative flex items-center">
            <span className="text-sm text-black">View Cart</span>
            {nbPurchase > 0 && (
              <span className="ml-2 w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {nbPurchase}
              </span>
            )}
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
