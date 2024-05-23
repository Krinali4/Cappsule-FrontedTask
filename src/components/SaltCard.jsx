import React, { useEffect, useState } from "react";
import { SaltBtn } from "./SaltBtn";

export function SaltCard({ medsInfo }) {
  const form = Object.keys(medsInfo.salt_forms_json);
  const [selectedForm, setSelectedForm] = useState(form[0]);
  const [showMoreForm, setShowMoreForm] = useState(false);
  const [showMoreStrength, setShowMoreStrength] = useState(false);
  const [showMorePackaging, setShowMorePackaging] = useState(false);
  const getStrength = (crrVal) => {
    return Object.keys(medsInfo.salt_forms_json[crrVal]);
  };
  const [selectedStrength, setSelectedStrength] = useState(
    getStrength(selectedForm)[0],
  );

  // packaging Array for iteration
  const packagingObj = medsInfo?.salt_forms_json[selectedForm]?.[
    selectedStrength
  ]
    ? Object.keys(medsInfo.salt_forms_json[selectedForm][selectedStrength])
    : [];
  const [selectedPackage, setSelectedPackage] = useState(packagingObj[0]);

  // an array to check the price of Salt
  const storeArr = Object.values(
    medsInfo?.salt_forms_json?.[selectedForm]?.[selectedStrength]?.[
      selectedPackage
    ] || [],
  );

  const getMinPrice = (storeArr) => {
    let tempArr = storeArr.filter((val) => val !== null);
    if (tempArr.length > 0) {
      let minPrice = Infinity;

      tempArr.forEach((obj) => {
        obj.forEach((store) => {
          if (store.selling_price < minPrice) {
            minPrice = store.selling_price;
          }
        });
      });

      return minPrice;
    }

    return null;
  };
  const minPrice = getMinPrice(storeArr);

  // function to check if salt is available with price
  const checkWithRecursion = (array) => {
    return array.some((val) => {
      if (Array.isArray(val)) {
        return true;
      } else if (typeof val === "object" && val !== null) {
        return checkWithRecursion(Object.values(val));
      }
      return false;
    });
  };

  const handleFormBtn = (index) => {
    setSelectedForm(form[index]);
  };
  const handleStrengthBtn = (index) => {
    setSelectedStrength(getStrength(selectedForm)[index]);
  };
  const handlePackagingBtn = (i) => {
    setSelectedPackage(packagingObj[i]);
  };

  // to make the first value selected by defaut
  useEffect(() => {
    setSelectedStrength(getStrength(selectedForm)[0]);
  }, [selectedForm]);
  useEffect(() => {
    setSelectedPackage(packagingObj[0]);
  }, [selectedStrength]);
  return (
    <div className="meds-container flex justify-stretch p-6 rounded-2xl text-left max-md:flex-col max-md:py-10">
      <div className="grow w-1/3 space-y-7 max-md:w-full">
        <div className="flex max-md:flex-col  max-md:gap-3">
          <div className="w-1/3 max-md:w-full">Form:</div>
          <div className="w-3/4 flex flex-wrap gap-3 max-md:w-full">
            {form.slice(0, 4).map((formType, i) => {
              const tempArr = Object.values(
                medsInfo?.salt_forms_json?.[formType],
              );

              const isAvailable = checkWithRecursion(tempArr);
              return (
                <SaltBtn
                  key={i}
                  onClick={() => handleFormBtn(i)}
                  className={
                    formType === selectedForm
                      ? "border-[#112D31] text-[#112D31] border-[2px] shadow-[0px_0px_11.54px_0px_#00C5A166] font-semibold"
                      : "border-[#ABABAB] text-[#555555]"
                  }
                  isAvailable={isAvailable ? "border-solid" : "border-dashed"}
                  children={formType}
                  index={i}
                />
              );
            })}
            {showMoreForm &&
              form.slice(4).map((formType, i) => {
                const tempArr = Object.values(
                  medsInfo?.salt_forms_json?.[formType],
                );

                const isAvailable = checkWithRecursion(tempArr);
                return (
                  <SaltBtn
                    key={i}
                    onClick={() => handleFormBtn(i + 4)}
                    className={
                      formType === selectedForm
                        ? "border-[#112D31] text-[#112D31] border-[2px] shadow-[0px_0px_11.54px_0px_#00C5A166] font-semibold"
                        : "border-[#ABABAB] text-[#555555]"
                    }
                    isAvailable={isAvailable ? "border-solid" : "border-dashed"}
                    children={formType}
                    index={i}
                  />
                );
              })}
            {form.length > 4 && (
              <span
                className="cursor-pointer text-[#204772] text-[14px] font-bold flex items-center"
                onClick={() => setShowMoreForm(!showMoreForm)}
              >
                {showMoreForm ? "hide..." : "more..."}
              </span>
            )}
          </div>
        </div>
        <div className="flex max-md:flex-col  max-md:gap-3">
          <div className="w-1/3 max-md:w-full">Strength:</div>
          <div className="w-3/4 flex flex-wrap gap-3 max-md:w-full">
            {getStrength(selectedForm)
              ?.slice(0, 4)
              .map((strength, i) => {
                const tempArr = Object.values(
                  medsInfo?.salt_forms_json?.[selectedForm]?.[strength],
                );

                const isAvailable = checkWithRecursion(tempArr);

                return (
                  <SaltBtn
                    key={i}
                    onClick={() => handleStrengthBtn(i)}
                    className={
                      strength === selectedStrength
                        ? "border-[#112D31] text-[#112D31] border-[2px] shadow-[0px_0px_11.54px_0px_#00C5A166] font-semibold"
                        : "border-[#ABABAB] text-[#555555]"
                    }
                    isAvailable={isAvailable ? "border-solid" : "border-dashed"}
                    children={strength}
                    index={i}
                  />
                );
              })}
            {showMoreStrength &&
              getStrength(selectedForm)
                ?.slice(4)
                .map((strength, i) => {
                  const tempArr = Object.values(
                    medsInfo?.salt_forms_json?.[selectedForm]?.[strength],
                  );

                  const isAvailable = checkWithRecursion(tempArr);

                  return (
                    <SaltBtn
                      key={i}
                      onClick={() => handleStrengthBtn(i + 4)}
                      className={
                        strength === selectedStrength
                          ? "border-[#112D31] text-[#112D31] border-[2px] shadow-[0px_0px_11.54px_0px_#00C5A166] font-semibold"
                          : "border-[#ABABAB] text-[#555555]"
                      }
                      isAvailable={
                        isAvailable ? "border-solid" : "border-dashed"
                      }
                      children={strength}
                      index={i}
                    />
                  );
                })}
            {getStrength(selectedForm)?.length > 4 && (
              <span
                className="cursor-pointer text-[#204772] text-[14px] font-bold flex items-center"
                onClick={() => setShowMoreStrength(!showMoreStrength)}
              >
                {showMoreStrength ? "hide..." : "more..."}
              </span>
            )}
          </div>
        </div>
        <div className="flex max-md:flex-col  max-md:gap-3">
          <div className="w-1/3 max-md:w-full">Packaging :</div>
          <div className="w-3/4 flex flex-wrap gap-3 max-md:w-full">
            {packagingObj.slice(0, 4).map((pkg, i) => {
              const tempArr = Object.values(
                medsInfo?.salt_forms_json?.[selectedForm]?.[selectedStrength]?.[
                  pkg
                ],
              );
              const isAvailable = tempArr.some((val) => Array.isArray(val));
              return (
                <SaltBtn
                  key={i}
                  onClick={() => handlePackagingBtn(i)}
                  className={
                    pkg === selectedPackage
                      ? "border-[#112D31] text-[#112D31] border-[2px] shadow-[0px_0px_11.54px_0px_#00C5A166] font-semibold"
                      : "border-[#ABABAB] text-[#555555]"
                  }
                  isAvailable={isAvailable ? "border-solid" : "border-dashed"}
                  children={pkg}
                  index={i}
                />
              );
            })}
            {showMorePackaging &&
              packagingObj.slice(4).map((pkg, i) => {
                const tempArr = Object.values(
                  medsInfo?.salt_forms_json?.[selectedForm]?.[
                    selectedStrength
                  ]?.[pkg],
                );
                const isAvailable = tempArr.some((val) => Array.isArray(val));
                return (
                  <SaltBtn
                    key={i}
                    onClick={() => handlePackagingBtn(i + 4)}
                    className={
                      pkg === selectedPackage
                        ? "border-[#112D31] text-[#112D31] border-[2px] shadow-[0px_0px_11.54px_0px_#00C5A166] font-semibold"
                        : "border-[#ABABAB] text-[#555555]"
                    }
                    isAvailable={isAvailable ? "border-solid" : "border-dashed"}
                    children={pkg}
                    index={i}
                  />
                );
              })}
            {packagingObj?.length > 4 && (
              <span
                className="cursor-pointer text-[#204772] text-[14px] font-bold flex items-center"
                onClick={() => setShowMorePackaging(!showMorePackaging)}
              >
                {showMorePackaging ? "hide..." : "more..."}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="grow w-1/3 text-center flex flex-col justify-center max-md:w-full max-md:my-5 max-md:text-left">
        <h4 className="font-semibold text-[#222222]">
          {medsInfo?.salt.includes("+")
            ? medsInfo?.salt.replace(/\+/g, " + ")
            : medsInfo?.salt}
        </h4>
        <p className="font-medium text-[#2A527A]">
          {selectedForm} | {selectedStrength} | {selectedPackage}
        </p>
      </div>
      <div className="grow w-1/3 flex justify-center items-center max-md:w-full max-md:justify-start">
        {minPrice ? (
          <div className="price font-bold text-[28px]">From₹{minPrice}</div>
        ) : (
          <div className="mx-auto border border-[#A7D6D4] rounded-lg py-3 px-8 bg-white text-[#112D31] text-[14px] text-center max-md:w-full">
            No stores selling this
            <br />
            product near you
          </div>
        )}
      </div>
    </div>
  );
}
