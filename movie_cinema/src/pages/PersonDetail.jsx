import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getPersonDetails, getPersonCombinedCredits } from "../services/api";

function PersonDetail() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const personData = await getPersonDetails(id);
            const creditsData = await getPersonCombinedCredits(id);
            setPerson(personData);
            setCredits(creditsData);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-white text-center">{t('loadingPersonDetails')}</div>;
    if (!person) return <div className="p-8 text-white text-center">{t('personNotFound')}</div>;

    const knownFor = credits?.cast
        ? credits.cast
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 8)
        : [];

    const sortedCredits = credits?.cast
        ? [...credits.cast].sort((a, b) => (b.release_date || b.first_air_date || '').localeCompare(a.release_date || a.first_air_date || ''))
        : [];

    return (
        <div className="max-w mx-auto p-16 bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Photo'}
                    alt={person.name}
                    className="rounded-lg w-64 h-auto mx-auto md:mx-0"
                />
                <div className="flex-1">
                    <h1 className="text-3xl text-white font-bold mb-2">{person.name}</h1>
                    <p className="text-white mb-2">{person.known_for_department}</p>
                    <div className="mb-2">
                        <span className="text-white font-semibold">{t('birthday')}:</span>{" "}
                        {person.birthday || "Unknown"}
                    </div>
                    {person.place_of_birth && (
                        <div className="mb-2">
                            <span className="font-semibold">{t('placeOfBirth')}:</span>{" "}
                            {person.place_of_birth}
                        </div>
                    )}
                    {person.deathday && (
                        <div className="mb-2">
                            <span className="font-semibold text-red-600">{t('deathday')}:</span>{" "}
                            {person.deathday}
                        </div>
                    )}
                    <div className="mb-2">
                        <span className="font-semibold">{t('gender')}:</span>{" "}
                        {person.gender === 1 ? t('female') : person.gender === 2 ? t('male') : t('other')}
                    </div>
                    {person.imdb_id && (
                        <div className="mb-2">
                            <a
                                href={`https://www.imdb.com/name/${person.imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {t('imdbProfile')}
                            </a>
                        </div>
                    )}
                    {person.homepage && (
                        <div className="mb-2">
                            <a
                                href={person.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {t('homepage')}
                            </a>
                        </div>
                    )}
                    {person.also_known_as && person.also_known_as.length > 0 && (
                        <div className="mb-2">
                            <span className="font-semibold">{t('alsoKnownAs')}:</span>
                            <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                                {person.also_known_as.map((name, idx) => (
                                    <li key={idx}>{name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">{t('biography')}</h2>
                <p className="text-gray-700 whitespace-pre-line">{person.biography || "No biography available."}</p>
            </div>
            {/* Known For Section */}
            {knownFor.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">{t('knownFor')}</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {knownFor.map(movie => (
                            <div key={movie.id} className="w-32 flex-shrink-0">
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300/374151/ffffff?text=No+Poster'}
                                    alt={movie.title || movie.name}
                                    className="rounded-lg w-full h-48 object-cover mb-2"
                                />
                                <div className="text-xs text-center">{movie.title || movie.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Credits Section */}
            {sortedCredits.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">{t('credits')}</h2>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                        {sortedCredits.map(credit => (
                            <div key={credit.credit_id} className="flex items-center mb-2">
                                <div className="w-16 text-gray-500">
                                    {(credit.release_date || credit.first_air_date || '').slice(0, 4)}
                                </div>
                                {/* ✅ Title clickable, điều hướng đến movie/tv detail */}
                                <div
                                    className="flex-1 font-medium text-blue-600 hover:underline cursor-pointer"
                                    onClick={() => {
                                        if (credit.media_type === "movie") {
                                            navigate(`/movie/${credit.id}`);
                                        } else if (credit.media_type === "tv") {
                                            navigate(`/tv/${credit.id}`);
                                        }
                                    }}
                                >
                                    {credit.title || credit.name}
                                </div>
                                <div className="text-gray-600 text-sm ml-2">
                                    {credit.character && `as ${credit.character}`}
                                </div>
                                {credit.episode_count && (
                                    <div className="text-xs text-blue-600 ml-2">
                                        {credit.episode_count} {t('episodes')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PersonDetail;