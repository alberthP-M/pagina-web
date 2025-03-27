import React from "react";

const Order = ({ showOrder }) => {
  return (
    <div
      className={`transition-all w-full ${
        showOrder
          ? "right-0 bottom-24 lg:w-3/12"
          : "-right-full bottom-24 lg:hidden"
      } bg-white top-0 dark:bg-[#1F1D2B] lg:min-h-screen fixed rounded-xl shadow-lg lg:static text-center lg:text-start px-5 py-4`}
    >
      <h2 className="text-xl text-[#012970] dark:text-white font-bold">
        Seccion de Pedidos
      </h2>
      <p className="mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
        inventore aperiam optio natus, non labore necessitatibus beatae totam
        tempore delectus exercitationem. Consequatur sint dignissimos voluptatem
        eligendi dolorem odit distinctio officiis.
      </p>
    </div>
  );
};

export default Order;
