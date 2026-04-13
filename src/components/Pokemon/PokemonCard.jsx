import Card from '../Cards/Card';
import CardHeader from '../Cards/CardHeader';
import CardBody from '../Cards/CardBody';
import CardFooter from '../Cards/CardFooter';
import { useNavigate } from 'react-router';

const PokemonCard = ({ data }) => {
  const redirectTo = useNavigate();

  const getStat = (statName) =>
    data?.stats?.find((item) => item?.stat?.name === statName)?.base_stat ?? '-';

  const hp = getStat('hp');
  const atk = getStat('attack');
  const def = getStat('defense');

  const types = data?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [];
  const primaryType =
    data?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0];

  const headerTypeColor = {
    normal: 'from-stone-400 to-stone-600',
    fire: 'from-orange-400 to-red-500',
    water: 'from-blue-400 to-blue-600',
    electric: 'from-yellow-300 to-yellow-500',
    grass: 'from-green-400 to-green-700',
    ice: 'from-cyan-300 to-cyan-500',
    fighting: 'from-red-500 to-red-700',
    poison: 'from-violet-400 to-violet-700',
    ground: 'from-amber-400 to-amber-700',
    flying: 'from-sky-300 to-sky-500',
    psychic: 'from-pink-400 to-pink-600',
    bug: 'from-lime-400 to-lime-700',
    rock: 'from-yellow-600 to-yellow-800',
    ghost: 'from-indigo-500 to-indigo-800',
    dragon: 'from-indigo-400 to-purple-600',
    dark: 'from-neutral-700 to-neutral-900',
    steel: 'from-slate-400 to-slate-600',
    fairy: 'from-rose-300 to-rose-500'
  };

  const headerBgClass = headerTypeColor[primaryType] ?? 'from-green-400 to-green-700';

  const formatText = (value) =>
    value
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const imageUrl =
    data?.sprites?.other?.['official-artwork']?.front_default ||
    data?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

  return (
    <Card
      cardHeader={
        <CardHeader>
          <div
            className={`flex justify-center items-end w-full h-32 bg-gradient-to-br ${headerBgClass} rounded-t-xl`}
          >
            <img
              className="w-28 h-28 object-contain drop-shadow-xl translate-y-6"
              src={imageUrl}
              alt={data?.name || 'pokemon'}
            />
          </div>
        </CardHeader>
      }
      cardBody={
        <CardBody>
          <section className="mt-10 px-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-500">
                #{data?.id ?? '-'}
              </span>
              <div className="flex gap-2">
                {types.map((typeName) => (
                  <span
                    key={typeName}
                    className={`text-xs px-3 py-1 rounded-full text-white font-semibold bg-gradient-to-r ${
                      headerTypeColor[typeName] ?? 'from-green-400 to-green-700'
                    }`}
                  >
                    {formatText(typeName)}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-center text-xl font-bold mb-4">
              {formatText(data?.name) || '-'}
            </h2>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-stone-200 rounded-xl py-2 shadow-sm">
                <p className="text-xs font-semibold text-gray-600">HP</p>
                <p className="font-bold text-gray-800">{hp}</p>
              </div>

              <div className="bg-stone-200 rounded-xl py-2 shadow-sm">
                <p className="text-xs font-semibold text-gray-600">ATK</p>
                <p className="font-bold text-gray-800">{atk}</p>
              </div>

              <div className="bg-stone-200 rounded-xl py-2 shadow-sm">
                <p className="text-xs font-semibold text-gray-600">DEF</p>
                <p className="font-bold text-gray-800">{def}</p>
              </div>
            </div>
          </section>
        </CardBody>
      }
      cardFooter={
        <CardFooter>
          <section className="flex">
            <button
              className="flex-1 mx-4 mt-6 mb-3 px-4 py-3 bg-stone-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-stone-400 transition"
              onClick={() => redirectTo(`/pokemon/${data?.id}`)}
            >
              Ver detalles
            </button>
          </section>
        </CardFooter>
      }
    />
  );
};

export default PokemonCard;