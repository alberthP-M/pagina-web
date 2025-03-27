import Layout from "../components/shared/layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Sidebar from "../components/shared/sidebar";

export default function Home() {
  return (
    <>
      <Layout title="Order" description="ComiFast for order section">
        <div className="flex items-center justify-center w-full min-h-screen">
          Dashboard
        </div>
      </Layout>
    </>
  );
}
