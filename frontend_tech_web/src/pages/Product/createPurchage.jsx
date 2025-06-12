import React, { useState } from "react";
import ApiService from "../../service/apiService";
import { toast } from 'react-toastify'


const CreatePurchage = ({ productId, onPurchaseAdded }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddCart = async () => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      alert("Panier introuvable");
      return;
    }

    try {
      await ApiService.post("/create_purchase/", {
        product_id: productId,
        quantity: quantity,
        cart_id: cartId,
      });
      console.log("mandeha")

      toast.success("Add to card confirmed")

      if (onPurchaseAdded) {
        onPurchaseAdded(); 
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const onChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  return (
    <div>
      <label htmlFor="" className="block text-sm font-medium mb-1">
        Quantity
      </label>
      <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden mt-4">
        <button
          type="button"
          onClick={decrement}
          className="px-3 py-1 text-gray-700 font-semibold"
          aria-label="Decrement quantity"
        >
          -
        </button>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-10 text-center outline-none  focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={increment}
          className="px-3 py-1 text-gray-700 font-semibold"
          aria-label="Increment quantity"
        >
          +
        </button>
      </div>
      <div>
        <button
          onClick={handleAddCart}
          className=" w-full mt-20 bg-stone-950 hover:bg-stone-700 text-white rounded-md h-10"
        >
          Add to Card
        </button>
      </div>
    </div>
  );
};

export default CreatePurchage;
