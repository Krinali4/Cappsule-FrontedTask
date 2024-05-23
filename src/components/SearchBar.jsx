import React from "react";
import { CiSearch } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  disabled,
  isResult,
  resetSearchCallBack,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const resetSearch = () => {
    resetSearchCallBack();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sticky top-0 shadow-[0px_0px_50px_0px_#ADADAD66] rounded-full flex items-center  px-8 gap-[26px]  focus-within:ring-2 focus-within:ring-[#888888] focus-within:-ring-offset-2"
    >
      <span>
        {isResult ? (
          <GoArrowLeft
            className="cursor-pointer"
            onClick={resetSearch}
            size={26}
          />
        ) : (
          <CiSearch size={26} />
        )}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type your medicine name here"
        disabled={disabled}
        className="grow focus:outline-none py-5"
      />
      <button
        className="font-semibold text-[16px] text-[#2A527A]"
        type="submit"
        disabled={disabled}
      >
        Search
      </button>
    </form>
  );
}
