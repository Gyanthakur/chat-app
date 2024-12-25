import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
const ChatBox = () => {
	const { userData, messagesId, chatUser, messages, setMessages } =
		useContext(AppContext);

        const [input, setInput] = useState("");


        useEffect(()=>{
            if(messagesId){
                const unSub = onSnapshot(doc(db,'messages', messagesId),(res)=>{
                    setMessages(res.data().messages.reverse())
                    console.log(res.data().messages.reverse());
                    
                })
                return ()=>{
                    unSub();
                }
            }
        },[messagesId])

	return chatUser ?  (
		<div className="chat-box">
			<div className="chat-user">
				{/* <img src={assets.profile_img} alt="" /> */}
				<img src={chatUser.userData.avatar} alt="" />
				<p>
					{chatUser.userData.name}<img className="dot" src={assets.green_dot} alt="" />
				</p>
				<img src={assets.help_icon} className="help" alt="" />
			</div>

			<div className="chat-msg">
				<div className="s-msg">
					<p className="msg">
						Lorem ipsum dolor sit amet usto praesentium modi....
					</p>
					<div>
						<img src={assets.profile_img} alt="" />
						<p>02:30 PM</p>
					</div>
				</div>
				{/* sender msg */}
				<div className="s-msg">
					<img className="msg-img" src={assets.pic1} alt="" />
					<div>
						<img src={assets.profile_img} alt="" />
						<p>02:30 PM</p>
					</div>
				</div>
				<div className="r-msg">
					<p className="msg">
						Lorem ipsum dolor elit. Iusto praesentium modi....
					</p>
					<div>
						<img src={assets.profile_img} alt="" />
						<p>02:30 PM</p>
					</div>
				</div>
			</div>

			<div className="chat-input">
				<input type="text" placeholder="Send a message" />
				<input type="file" id="image" accept="image/png, image/jpeg" hidden />
				<label htmlFor="image">
					<img src={assets.gallery_icon} alt="" />
				</label>
				<img src={assets.send_button} alt="" />
			</div>
		</div>
	)
    : <div className="chat-welcome">
        <img src={assets.logo_icon} alt="" />
        <p>Chat anytime, from any where!</p>
    </div> ;
};

export default ChatBox;
