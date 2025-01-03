import { RiArrowDropDownFill } from "react-icons/ri";
import { useNavContext } from "../state managament/NavContext";
function User() {
  const { userData } = useNavContext();
  return (
    <div className="flex h-full w-fit items-center gap-4">
      <div
        title="User"
        className="h-[3rem] w-[3rem] rounded-full bg-[#1f1f1f] p-1 hover:cursor-pointer"
      >
        <img
          src={userData?.images[0]?.url}
          className="rounded-full object-cover"
          alt="user logo"
        />
      </div>
    </div>
  );
}

export default User;
