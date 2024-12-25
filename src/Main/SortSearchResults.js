import { useNavContext } from "../state managament/NavContext";

function SortSearchResults() {
  const { result } = useNavContext();
  const resultKeys = Object.keys(result);

  const capitalized = resultKeys.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  return (
    <div className="w-50% flex flex-row gap-5">
      <div className="py- flex h-7 w-[5rem] cursor-pointer items-center justify-center rounded-xl bg-[#2a2a2a] px-1 font-medium text-white hover:bg-[#3a3a3a]">
        All
      </div>
      {capitalized.map((key) => (
        <div className="py- flex h-7 w-[5rem] cursor-pointer items-center justify-center rounded-xl bg-[#2a2a2a] px-1 font-medium text-white hover:bg-[#3a3a3a]">
          {key}
        </div>
      ))}
    </div>
  );
}

export default SortSearchResults;
