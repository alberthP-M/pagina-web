import Layout from "../components/shared/layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import Sidebar from "../components/shared/sidebar";
import Header from "../components/shared/header";
import FlipMove from "react-flip-move";
import Order from "../components/shared/order";

export default function Home() {
  return (
    <>
      <Layout title="Order" description="ComiFast for order section">
        {/* Inicio del contenido dashboard */}
        <h2 className="text-xl text-center text-[#012970] dark:text-white font-bold">
          Seccion de Dashboard
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
}
