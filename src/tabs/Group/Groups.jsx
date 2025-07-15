import AllGroups from "./AllGroups";
import GroupHeader from "./GroupHeader";

export default function Groups() {
  return (
    <div className="h-full w-full grid grid-rows-[1fr_9fr] ">
      <div className="">
        <GroupHeader/>
      </div>
      <div className="">
        <AllGroups/>
      </div>
    </div>
  )
}
