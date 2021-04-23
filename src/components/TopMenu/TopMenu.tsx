import { AuthControls } from "../AuthControls"
import Link from "next/link"
import React from "react"

export const TopMenu = ({
  showAuth = false,
  showPricing = false,
}: {
  showAuth?: boolean
  showPricing?: boolean
}) => (
  <div className="text-gray-700 bg-white body-font">
    <div className="flex flex-col flex-wrap p-5 mx-auto border-b md:items-center md:flex-row">
      <Link href="/">
        <a href="/events" className="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
          <div className="inline-flex items-center">
            <div className="brand">
              <h1 className="m-0">
                <img src="/logo2.png" alt="Frame" width="128" height="31" />
              </h1>
            </div>
          </div>
        </a>
      </Link>
      <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto ">
        {showPricing && (
          <a
            href="/pricing"
            className="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            Pricing
          </a>
        )}

        {showAuth && <AuthControls />}
      </nav>
    </div>
  </div>
)
