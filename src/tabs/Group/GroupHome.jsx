import { useGroup } from "./context/GroupContext"
import Group from "./Group"
import GroupProfile from "./GroupProfile";
import Groups from "./Groups"

function GroupHome() {
  const {GroupSlideRef , GroupsSlideRef , GroupDetailsRef} = useGroup();
  return (
    <div className="w-full h-full flex flex-row md:grid md:grid-cols-[1fr_1fr] overflow-hidden ">
      <div className="flex-shrink-0 w-[100dvw] h-[90dvh] md:h-[100dvh] md:w-full" ref={GroupsSlideRef} >
        <Groups/>
      </div>
      <div className="flex-shrink-0 w-[100dvw] h-[90dvh] md:h-[100dvh] md:w-full relative" ref={GroupSlideRef}>
          <Group/>
        <div className="absolute top-[-100%] right-0 w-full h-full" ref={GroupDetailsRef}>
        <GroupProfile/>
      </div>
      </div>

    </div>
  )
}

export default GroupHome
