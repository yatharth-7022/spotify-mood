import { useNavContext } from "../state managament/NavContext";

function Greeting() {
  const { userData } = useNavContext();
  return (
    <div className="mt-4 w-full text-3xl font-extrabold text-white">
      Good morning, {userData?.display_name}
    </div>
  );
}

export default Greeting;
