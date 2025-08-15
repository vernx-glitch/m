"use client";
import Divider from "@/app/components/Divider";
import Link from "next/link";
import { useEffect, useState } from "react";

interface List {
  fullname: string;
  id: number;
  total: number;
  totalAmount: number;
  username: string;
}

export default function Leaderboard() {
  const [listToday, setListToday] = useState<List[]>([]);
  const [listWeek, setListWeek] = useState<List[]>([]);
  const [listMonth, setListMonth] = useState<List[]>([]);
  const [error, setError] = useState<string | null>(null);

  const listDataCard = [
    { title: "Today", state: listToday },
    { title: "This Week", state: listWeek },
    { title: "This Month", state: listMonth },
  ];

  const getListToday = async (): Promise<void> => {
    try {
      const res = await fetch("https://vernx-api.vercel.app/today"); // ✅ changed domain
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const response = await res.json();
      setListToday(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  const getListWeek = async (): Promise<void> => {
    try {
      const res = await fetch("https://vernx-api.vercel.app/week"); // ✅ changed domain
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const response = await res.json();
      setListWeek(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  const getListMonth = async (): Promise<void> => {
    try {
      const res = await fetch("https://vernx-api.vercel.app/month"); // ✅ changed domain
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const response = await res.json();
      setListMonth(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  useEffect(() => {
    getListToday();
    getListWeek();
    getListMonth();
  }, []);

  useEffect(() => {
    if (error) console.error("Error fetching leaderboard:", error);
  }, [error]);

  return (
    <>
      <div className="container flex flex-col mx-auto px-4 pt-14 sm:pt-24 pb-12 space-y-5 xl:max-w-7xl justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col text-center gap-y-2">
            <h1 className=" text-[#0563FC] font-semibold leading-7">
              Leaderboard
            </h1>
            <h1 className=" text-3xl sm:text-4xl font-bold">
              Top 10 Purchases at vernx Shop
            </h1>
            <p className="max-w-3xl mt-4 text-center text-lg leading-8">
              Below is a list of the top 10 customers based on total purchases. This data is pulled from our system and updated regularly.{" "}
              <span className=" text-pink-600">
                (Last updated: September 11, 2024. See latest updates at{" "}
                <Link
                  href={"https://vernx.com/leaderboard"}
                  className="underline font-bold hover:text-pink-500 transition-all"
                >
                  vernx.com/leaderboard
                </Link>
                )
              </span>
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-14 sm:mt-24 text-sm">
            {listDataCard?.map((d) => (
              <div
                key={d.title}
                className="w-full flex flex-col items-center mx-auto max-w-md lg:max-w-none"
              >
                <div className="flex w-full">
                  <div className="px-4 py-1.5 ml-3 bg-[#212121] ring-1 ring-[#535353] text-xs rounded-t-md">
                    Top 10 - {d.title}
                  </div>
                </div>
                <div className="w-full h-full p-6 bg-[#1E1E1E] rounded-lg ring-1 ring-[#212121]">
                  <ul className=" space-y-3">
                    {d.state?.map((entry, i) => (
                      <li key={i} className="flex justify-between">
                        <div>
                          {i + 1}. {entry.fullname}
                          {i === 0
                            ? " 🥇"
                            : i === 1
                            ? " 🥈"
                            : i === 2
                            ? " 🥉"
                            : null}
                        </div>
                        <div>
                          Rp{" "}
                          {entry.totalAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}
