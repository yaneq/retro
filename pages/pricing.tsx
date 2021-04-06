import * as React from "react"
import { TopMenu } from "src/components/TopMenu"

const Pricing = () => (
  <>
    <TopMenu />
    <section className="text-gray-700 body-font">
      <div className="container px-8 pt-24 mx-auto lg:px-4">
        <div className="flex flex-wrap text-center">
          <div className="px-8 py-6 mx-auto lg:px-24 lg:w-2/4 md:w-full">
            <div className="flex flex-col items-center justify-center h-full px-4 py-6 text-center shadow-xl rounded-xl">
              <h2 className="flex items-baseline justify-center mt-2 text-3xl font-bold leading-none text-black lg:text-6xl">
                Free*
                <span className="ml-1 text-base text-gray-600"></span>
              </h2>
              <p className="my-4 text-base leading-relaxed ">* for now.</p>
              <p className="my-4 text-base leading-relaxed ">
                This is just another developers dream of having a SaaS. One day
                there might be a premium version. I hope you are enjoying
                reretro.
              </p>
              {/* <button className="flex items-center px-8 py-3 mx-auto mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                Action
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default Pricing
