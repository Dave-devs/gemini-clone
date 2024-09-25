import "./SideBar.css";
import { images } from "../../contants/images";
import { useContext, useState } from "react";
import { Context } from '../../context/Context';

const SideBar = () => {
    const [extended, setExtended] = useState<boolean>(false);
    const context = useContext(Context);

    if (!context) {
        return <div>Error: Context is not available!</div>;
    }

    const {
        onSent,
        previousPrompt,
        setRecentPrompt,
        newChat
    } = context;

    const loadRecentPrompt = async (prompt: string) => {
        setRecentPrompt(prompt);

        await onSent(prompt)
    }

    return (
        <div className="sidebar">
            {/* Top Section */}
            <div className="top">
                {/* Menu  Icon */}
                <img onClick={() => setExtended((prev) => !prev)} className="menu" src={images.menu} alt="Menu Icon" />
                {/* New Chat Button */}
                <div onClick={() => newChat()} className="new-chat">
                    <img src={images.plus} alt="Plus Icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {/* Recent  Chats */}
                {extended ? (
                    <div className="recent">
                        {/* Rencent Header Text */}
                        <p className="recent-title">Recent</p>
                        {/* Recent Chat  List(Icon & Text) */}
                        {previousPrompt.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadRecentPrompt(item)} className="recent-entry">
                                    <img src={images.speech} alt="Recent Icon" />
                                    <p className="recent-text">{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}
                    </div>
                ) : null}
            </div>

            {/* Bottom Section */}
            <div className="bottom">
                {/* Gem */}
                <div className="bottom-item recent-entry">
                    <img src={images.diamond} alt="Gem Icon" />
                    {extended ? <p>Gem manager</p> : null}
                </div>
                {/* Help */}
                <div className="bottom-item recent-entry">
                    <img src={images.information} alt="Help Icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                {/* Activity */}
                <div className="bottom-item recent-entry">
                    <img src={images.restore} alt="Activity Icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                {/* Settings */}
                <div className="bottom-item recent-entry">
                    <img src={images.setting} alt="Settings Icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
