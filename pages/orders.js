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
        <div className="flex items-center justify-center w-full min-h-screen">
          Orden
        </div>
        <Sidebar />
      </Layout>
    </>
  );
};

export default Orders;
