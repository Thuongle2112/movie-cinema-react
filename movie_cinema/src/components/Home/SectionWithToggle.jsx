import ToggleSwitch from './ToggleSwitch';
import HorizontalMovieScroll from './HorizontalMovieScroll';

const SectionWithToggle = ({ 
    title, 
    movies, 
    contentType, 
    toggleOptions, 
    activeOption, 
    onOptionChange, 
    loading 
}) => {
    return (
        <div className="mt-16 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
                <ToggleSwitch
                    options={toggleOptions}
                    activeOption={activeOption}
                    onOptionChange={onOptionChange}
                />
            </div>
            
            <HorizontalMovieScroll 
                title=""
                movies={movies} 
                contentType={contentType} 
                loading={loading}
            />
        </div>
    );
};

export default SectionWithToggle;