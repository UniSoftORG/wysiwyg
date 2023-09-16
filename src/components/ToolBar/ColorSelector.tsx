import React, {useEffect, useState} from 'react';
import {colorStyleMap} from "../../definitions/colors";
import {Getters} from "unisoft-utils";

interface DropdownSelectProps {
    label: string;
    options: string[];
    value: string | null;
    onChange: (selected: string) => void;
    onFocus?: any;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({label, options, value, onChange, onFocus}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    useEffect(() => {
        setSelectedOption(value);
    }, [value])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <div className="relative inline-block text-left" onFocus={onFocus}>
            <div onFocus={onFocus}>
                <button
                    type="button"
                    className="toolBarItem"
                    onClick={toggleDropdown}
                    style={{
                        boxShadow: `inset 0px 0px 18px -2px ${selectedOption ? Getters.getValue(colorStyleMap, `${selectedOption}`) : "rgba(255, 255, 255, 0.2)"}`,
                    }}
                >
                    {label}
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-20 mt-2 rounded-md shadow-lg bg-white ring-1 ring-opacity-5 w-40">
                    <div className="py-1" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(16px, 1fr))',
                    }} role="menu" aria-labelledby="options-menu">
                        {options.map((option, index) => {
                            const style = {
                                backgroundColor: colorStyleMap[option.toLowerCase() as string],
                                display: 'inline-block',
                                padding: '16px',
                            }

                            return (
                                <span
                                    key={index}
                                    style={style}
                                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                    onClick={() => handleOptionClick(option)}
                                >
                            </span>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownSelect;
