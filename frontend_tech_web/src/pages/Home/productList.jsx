import React from "react";

const ProductList = ({ products }) => {
  return (
    <div
      className="
        mt-10 
        px-4 sm:px-0 
        max-w-full 
        overflow-x-auto
        w-full sm:w-full md:w-full lg:w-[153vh] 
        ml-0 sm:ml-0 md:ml-0 lg:ml-44 pb-32
      "
    >
      <div>
        <span className="text-2xl font-bold block">Explore our latest drops</span>
      </div>

      <div className="mt-4 flex gap-3">
        {products.map((product, i) => (
          <div
            key={i}
            className="min-w-[140px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-[240px] max-w-[240px]"
          >
            <img
              src={`http://localhost:8000${product.prime_image}`}
              alt={product.name}
              className="w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-gray-200 rounded-2xl object-cover"
            />
            <div className="px-3 py-4">
              <span className="font-bold block">{product.name}</span>
              <span className="text-gray-400 text-sm block">{product.label}</span>
              <span className="font-bold block mt-1">${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
