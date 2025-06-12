import React, { useEffect, useState } from "react";
import ApiService from "../../service/apiService";
import { toast } from "react-toastify";

const UpdatePurchage = ({ quantity: initialQuantity, purchaseId, refresh , onPurchaseDeleted}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [lastSentQuantity, setLastSentQuantity] = useState(initialQuantity);

  const updateQuantity = async (newQuantity) => {
    if (newQuantity === lastSentQuantity || newQuantity === "") return;

    try {
      await ApiService.put(`/update_purchase/${purchaseId}/`, {
        quantity: newQuantity,
      });
      setLastSentQuantity(newQuantity);
      refresh();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const decrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateQuantity(newQuantity);
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(newQuantity);
  };

  const onChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.value === "") {
      setQuantity("");
    } else if (value >= 1) {
      setQuantity(value);
    }
  };

  const onBlur = () => {
    if (quantity !== "" && quantity !== lastSentQuantity) {
      updateQuantity(quantity);
    } else if (quantity === "") {
      setQuantity(lastSentQuantity); // remettre la valeur si vide
    }
  };

  useEffect(() => {
    setQuantity(initialQuantity);
    setLastSentQuantity(initialQuantity);
  }, [initialQuantity]);

  const deletePurchase = async (purchaseId) => {
    try {
    await ApiService.delete(`/delete_purchase/${purchaseId}/`);
    refresh(); 
    toast.error("Suppression avec succès")
    if (onPurchaseDeleted) {
      onPurchaseDeleted(); // déclenche le rechargement dans Navbar
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
  }

  return (
    <div className="mt-16 flex items-center">
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
          onChange={onChange}
          onBlur={onBlur}
          className="w-10 text-center outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
      <div className="mt-5 ml-12">
        <button onClick={() => deletePurchase(purchaseId)} className="underline text-blue-600 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
};

export default UpdatePurchage;