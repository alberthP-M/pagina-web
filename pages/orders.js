import React from "react";
import Layout from "../components/shared/layout";
import Sidebar from "../components/shared/sidebar";

const Orders = () => {
  return (
    <>
      <Layout
        title="All Orders"
        description="Explore all the orders you made with us"
      >
        {/* Inicio del contenido dashboard */}
        <h2 className="text-xl text-center text-[#012970] dark:text-white font-bold">
          Made orders section
        </h2>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          inventore aperiam optio natus, non labore necessitatibus beatae totam
          tempore delectus exercitationem. Consequatur sint dignissimos
          voluptatem eligendi dolorem odit distinctio officiis.
        </p>
      </Layout>
    </>
  );
};

export default Orders;
