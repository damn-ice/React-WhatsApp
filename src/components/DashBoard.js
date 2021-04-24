import { useConversation } from "../contexts/ConversationProvider"
import OpenConversation from "./OpenConversation"
import SideBar from "./SideBar"

const DashBoard = ({id}) => {
    const {selectedConversation} = useConversation();

    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <SideBar id={id}/>
            {selectedConversation && <OpenConversation />}
        </div>
    )
}

export default DashBoard
