import * as React from "react"

const Radio = ({ label, value, callback, selectedValue }) => (
  <label
    className="cursor-pointer w-1/5 flex items-center justify-center truncate uppercase select-none font-semibold text-md rounded-full py-3 font-sans"
    style={{ zIndex: 2 }}
  >
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
    <main className="max-w-screen-xl mx-auto p-2 flex flex-col items-center">
      <form className="flex w-full relative">
        {currentStep >= 0 && (
          <div
            className="w-1/5 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full p-0 h-full absolute transform transition-transform"
            style={{
              transform: `translateX(${currentStep}00%)`,
              backgroundColor: "#f5f5f5",
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
