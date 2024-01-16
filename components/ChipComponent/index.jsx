"use client"
import React, { useState, useRef, useEffect } from "react";
import data from "@/data/data.json";
import Image from "next/image";

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // showing chips which are not already added and which are in the input
    const filteredChips = data.filter(
      (dataObj) =>
        !chips.includes(dataObj.name) &&
        dataObj.name.toLowerCase().includes(inputValue.toLowerCase())
    )
    setFilteredItems(data.filter(
      (dataObj) =>
        !chips.includes(dataObj.name) &&
        dataObj.name.toLowerCase().includes(inputValue.toLowerCase())
    ));
    setHighlightedChip(null)
  }, [inputValue, chips]);

  // handling input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // handling focus to show suggestions
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };
  

  // handling blur to remove suggestions
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
  };

  // handling item selection
  const handleItemSelect = (selectedItem) => {
    setChips([...chips, selectedItem]);
    setInputValue("");
  };

  // handling chip remove
  const handleChipRemove = (removedChip) => {
    const chipsWithoutRemovedChip = chips.filter((chip) => chip !== removedChip)
    setChips(chipsWithoutRemovedChip);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      setHighlightedChip(lastChip);
      event.preventDefault(); 
    }
    if (event.key === "Backspace" && highlightedChip) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
    }
  };

  return (
    <div className="relative bg-white rounded-[12px] px-6 py-7 md:w-[70%] w-[80%]">
    <div className="text-xl font-medium text-[#222222] mb-4">Chip Component</div>
      <div className="flex flex-wrap gap-3">
      {/* chips that are added to the list */}
        {chips.map((chip, index) => (
          <div key={index} className={`flex items-center gap-x-2 rounded-[26px] ${highlightedChip === chip ? 'bg-black/60 text-white' : 'bg-[#E5E5E5]  text-[#222222]'}`}>
            <Image
              src={`/assets/list/${data.find((dataObj) => dataObj.name === chip)?.id}.png`}
              width={40}
              height={40}
              alt={chip.name}
              className=""
            />
            <span className="text-base">{chip}</span>
            
              <Image 
                src={'/assets/close.svg'}
                onClick={() => handleChipRemove(chip)}
                className="mr-2 cursor-pointer"
                width={20}
                height={20}
              />
          </div>
        ))}

        <div className="relative w-full">
        {/* input for adding */}
          <input
            className="w-full px-2 py-3 bg-transparent outline-none focus:border-b"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Type to search..."
          />

          {/* showing suggestions */}
          {showSuggestions && inputValue.length < 1 && (
            <div className="absolute flex flex-col mt-1 bg-white border rounded-md w-fit ">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemSelect(item.name)}
                  className="flex items-center px-6 py-3 rounded-sm cursor-pointer hover:bg-[#F7F7F7] gap-x-2 w-full"
                >
                  <Image
                    src={`/assets/list/${item.id}.png`}
                    width={46}
                    height={46}
                    alt={item.name}
                  />
                  <div className="flex flex-col items-start">
                    <div className="text-[#222222] text-md">{item.name}</div>
                    <div className="text-[#5E5E5E] text-base">{item.username}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* maintaining a filter list */}
          {inputValue.length > 0 && (
            <div className="absolute flex flex-col mt-1 bg-white border rounded-md w-fit">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemSelect(item.name)}
                  className="flex items-center md:px-6 px-3 md:py-3 py-2 w-full rounded-sm cursor-pointer hover:bg-[#F7F7F7] gap-x-2"
                >
                  <Image
                    src={`/assets/list/${item.id}.png`}
                    width={46}
                    height={46}
                    alt={item.name}
                  />
                  <div className="flex flex-col items-start">
                    <div className="text-[#222222] text-md">{item.name}</div>
                    <div className="text-[#5E5E5E] text-base">{item.username}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;