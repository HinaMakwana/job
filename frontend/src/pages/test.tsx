import { useState } from "react";

const SelectButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    const options = [
      'Option 1',
      'Option 2',
      'Option 3',
      'op1',
      'op3'
      // Add more options as needed
    ];
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option:any) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    const handleSearchInputChange = (event:any) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className={`select-button ${isOpen ? 'open' : ''} relative inline-block`}>
        <input type="text" className="" onClick={handleToggle} onChange={handleSearchInputChange} value={searchQuery} placeholder={selectedOption||'Select option'} />
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-800 border-2 border-blue-500">
            <ul className=" list-none p-0 m-0">
              {filteredOptions.map((option, index) => (
                <li key={index} onClick={() => handleOptionClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default SelectButton;
  