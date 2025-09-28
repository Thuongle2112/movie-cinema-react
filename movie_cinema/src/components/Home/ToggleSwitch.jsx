function ToggleSwitch({
    options = [],
    activeOption,
    onOptionChange,
    className = "",
    width = "w-64"
}) {
    if (options.length !== 2) {
        console.warn('ToggleSwitch requires exactly 2 options');
        return null;
    }

    const [leftOption, rightOption] = options;

    return (
        <div className={`relative bg-gray-100 p-1 rounded-lg shadow-sm h-10 ${width} ${className}`}>
            {/* Background slider */}
            <div
                className="absolute top-1 left-1 bottom-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-md shadow-sm transition-all duration-300 ease-out"
                style={{
                    width: 'calc(50% - 4px)',
                    left: activeOption === leftOption.value ? '2px' : 'calc(50% + 2px)'
                }}
            />

            {/* Toggle buttons */}
            <div className="relative flex h-full">
                <button
                    onClick={() => onOptionChange(leftOption.value)}
                    className={`
                        flex-1 flex items-center justify-center rounded-md text-sm font-medium 
                        transition-colors duration-300 relative z-10 whitespace-nowrap px-2
                        ${activeOption === leftOption.value
                            ? 'text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }
                    `}
                    title={leftOption.tooltip || leftOption.label}
                >
                    <span>{leftOption.label}</span>
                </button>

                <button
                    onClick={() => onOptionChange(rightOption.value)}
                    className={`
                        flex-1 flex items-center justify-center rounded-md text-sm font-medium 
                        transition-colors duration-300 relative z-10 whitespace-nowrap px-2
                        ${activeOption === rightOption.value
                            ? 'text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }
                    `}
                    title={rightOption.tooltip || rightOption.label}
                >
                    <span>{rightOption.label}</span>
                </button>
            </div>
        </div>
    );
}

export default ToggleSwitch;