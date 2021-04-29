import Link from "next/link"
import React from "react"

export const Footer = () => (
  <div style={{ marginTop: "auto" }}>
    <div className="w-full bg-gray-100 mt-1">
      <div className="container py-3"></div>
    </div>

    <div className="bg-black w-full ">
      <div className="container py-4 text-gray-400 font-sans text-sm font-bold flex justify-end">
        <Link href="/">
          <a className="flex items-center">
            ©{" "}
            <img
              src="/reretro2.svg"
              alt="Frame"
              width="60"
              height="15"
              className="mx-1"
            />{" "}
            {new Date().getFullYear()}
          </a>
        </Link>
      </div>
    </div>
  </div>
)
