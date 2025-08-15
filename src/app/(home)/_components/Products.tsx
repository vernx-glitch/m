"use client";
import { useEffect, useState } from "react";
import styles from "./animate.module.css";
import ProductsCard from "./ProductsCard";

interface ProductDetail {
  categoryName: string;
  code: string;
  handle: string;
  inputs: string[];
  isPopular: boolean;
  publisher: string;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface Product {
  name: string;
  products: ProductDetail[];
}

interface More {
  [key: string]: number; // flexible to hold counts for all categories
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<string>("Top Up");
  const [more, setMore] = useState<More>({ "Top Up": 12, Voucher: 12, Moogold: 12 });

  // Dummy Moogold products data - replace with real API data if available
  const moogoldProducts: ProductDetail[] = [
    {
      categoryName: "Moogold",
      code: "moogold-01",
      handle: "moogold-product-1",
      inputs: [],
      isPopular: false,
      publisher: "Moogold Publisher",
      subtitle: "Best Moogold Pack",
      thumbnail: "/images/moogold1.jpg",
      title: "Moogold 1000 Coins",
    },
    {
      categoryName: "Moogold",
      code: "moogold-02",
      handle: "moogold-product-2",
      inputs: [],
      isPopular: false,
      publisher: "Moogold Publisher",
      subtitle: "Value Pack",
      thumbnail: "/images/moogold2.jpg",
      title: "Moogold 2000 Coins",
    },
    // Add more as needed
  ];

  const getProducts = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/product");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setProducts(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  // Combine products from API + manual Moogold category
  const combinedProducts = [...products];

  // Add Moogold category if it doesn't exist yet
  if (!combinedProducts.find((p) => p.name === "Moogold")) {
    combinedProducts.push({
      name: "Moogold",
      products: moogoldProducts,
    });
  }

  // Mock loading data
  const mockData = ["", "", "", "", "", "", "", "", "", "", "", ""];

  return (
    <div className="container flex flex-col mx-auto px-4 gap-y-5 xl:max-w-7xl">
      <div className="flex items-center space-x-5">
        {combinedProducts.length !== 0
          ? combinedProducts.map((d, i) => (
              <button
                key={i}
                onClick={() => setMenu(d.name)}
                className={`${
                  menu === d.name
                    ? `bg-[#0563FC] active:bg-[#0563FC]/75 md:hover:bg-[#0563FC]/75`
                    : `bg-[#212121] active:bg-[#212121]/75 md:hover:bg-[#212121]/75`
                } px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ease-out`}
              >
                {d.name}
              </button>
            ))
          : ["Top Up", "Voucher", "Moogold"].map((d, i) => (
              <button
                key={i}
                className={`${
                  d === "Top Up"
                    ? `bg-[#0563FC] active:bg-[#0563FC]/75 md:hover:bg-[#0563FC]/75`
                    : `bg-[#212121] active:bg-[#212121]/75 md:hover:bg-[#212121]/75`
                } px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ease-out`}
              >
                {d}
              </button>
            ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-4 gap-4 sm:gap-x-6 sm:gap-y-8">
        {combinedProducts.length === 0
          ? mockData.map((d, i) => (
              <div
                key={i}
                className={`${styles.slideR} flex aspect-[4/6] bg-[#212121] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out animate-pulse`}
              >
                {d}
              </div>
            ))
          : combinedProducts
              .find((p) => p.name === menu)
              ?.products.slice(0, more[menu] || 12)
              .map((d) => <ProductsCard key={d.title} d={d} />)}
      </div>

      <div className="flex justify-center items-center">
        {menu && more[menu] < (combinedProducts.find((p) => p.name === menu)?.products.length || 0) ? (
          <button
            onClick={() => setMore({ ...more, [menu]: (more[menu] || 12) + 12 })}
            className="h-10 px-4 py-2 bg-[#121212] active:bg-[#121212]/70 md:hover:bg-[#121212]/80 font-medium text-xs rounded-md active:scale-95 transition-all duration-300 ease-out"
          >
            Tampilkan Lainnya...
          </button>
        ) : null}
      </div>
    </div>
  );
}
