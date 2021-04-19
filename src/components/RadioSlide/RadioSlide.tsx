import * as React from "react"
import { useState } from "react"
import styles from "./styles.module.css"

const Radio = ({ label, value, callback, selectedValue }) => (
  <label className="cursor-pointer w-1/6 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full py-2 font-sans">
    <input
      type="radio"
      name="tabs"
      className="appearance-none"
      onChange={() => callback(value)}
      checked={selectedValue === value}
    />
    {label}
  </label>
)

export const RadioSlide = ({
  options,
  currentValue,
  onChangeCallback,
}: {
  options: string[]
  currentValue: string
  onChangeCallback(value: string)
}) => {
  const currentStep = options.indexOf(currentValue)
  return (
    <main className="max-w-screen-xl mx-auto p-8 flex flex-col items-center">
      <form className="flex w-full relative">
        {currentStep >= 0 && (
          <div
            className="w-1/6 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full p-0 h-full bg-purple-100 absolute transform transition-transform tabAnim"
            style={{
              transform: `translateX(${currentStep}00%)`,
              zIndex: -9,
            }}
          />
        )}
        {options.map((option) => (
          <Radio
            key={option}
            value={option}
            label={option}
            callback={onChangeCallback}
            selectedValue={currentValue}
          />
        ))}
      </form>
    </main>
  )
}
