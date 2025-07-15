import { useGroup } from "./context/GroupContext"
import Group from "./Group"
import Groups from "./Groups"

function GroupHome() {
  const {GroupSlideRef , GroupsSlideRef } = useGroup();
  return (
    <div className="w-full h-full flex flex-row md:grid md:grid-cols-[1fr_1fr] overflow-hidden">
      <div className="flex-shrink-0 w-[100dvw] h-[90dvh] md:h-[100dvh] md:w-full" ref={GroupsSlideRef} >
        <Groups/>
      </div>
      <div className="flex-shrink-0 w-[100dvw] h-[90dvh] md:h-full md:w-full " ref={GroupSlideRef}>
        <Group/>
      </div>
    </div>
  )
}

export default GroupHome
