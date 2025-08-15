"use client";
import Link from "next/link";

const dataFooter = [
  {
    title: "Site Map",
    data: [
      { title: "Home", href: "/" },
      { title: "Login", href: "/" },
      { title: "Register", href: "/" },
      { title: "Check Transactions", href: "/invoices" },
      { 
        title: "WhatsApp", 
        href: "https://wa.me/9362425113"
      },
    ],
  },
  {
    title: "Support",
    data: [{ title: "WhatsApp", href: "/" }],
  },
  {
    title: "Legal",
    data: [
      { title: "Privacy Policy", href: "/" },
      { title: "Terms & Conditions", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="w-full bg-[#121212]">
      <div className="container flex flex-col mx-auto px-4 py-12 space-y-16 xl:max-w-7xl items-center">
        <div className="flex flex-col w-full space-y-5">
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-8 font-normal text-sm">
            {dataFooter.map((section) => (
              <div key={section.title} className="flex flex-col space-y-6">
                <div className="font-semibold text-[#0563FC] leading-6">
                  {section.title}
                </div>
                <div className="flex flex-col space-y-4">
                  {section.data?.map((item) => (
                    <Link key={item.title} href={item.href}>
                      <div className="hover:text-[#0563FC]/75 transition-all leading-6">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full text-xs text-center space-y-1 pt-10 border-t border-[#343434]">
          <h1>© 2025 vernx Shop. All rights reserved.</h1>
          <h1>
            Built by{" "}
            <Link
              href={"https://github.com/vernx"}
              className=" font-semibold text-[#0563FC]"
            >
              @vernx
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
