import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
const RightSidebar = () => {


	const {chatUser, messages} = useContext(AppContext);
	const [msgImages, setMsgImages] = useState([])
	useEffect(()=>{
		let tempVar = [];
		messages.map((msg)=>{
			if(msg.image){
				tempVar.push(msg.image);
			}

		})
		setMsgImages(tempVar);
		

	},[messages])

	return chatUser ? (
		<div className="rs">
			<div className="rs-profile">
				<img src={assets.profile_img} alt="" />
				{/* <img src={chatUser.userData.avatar} alt="" /> */}

				<h3>
					{chatUser.userData.name} <img src={assets.green_dot} className="dot" alt="" />
				</h3>
				<p>{chatUser.userData.bio} </p>
			</div>
			<hr />

			<div className="rs-media">
				<p>Media</p>
				<div>
					{msgImages.map((url,index)=> (<img onClick={()=>window.open(url)} key={index} src={url} alt="" />))}
					
					<img onClick={()=>window.open(assets.pic1)} src={assets.pic1} alt="" />
					<img onClick={()=>window.open(assets.pic2)} src={assets.pic2} alt="" />
					<img onClick={()=>window.open(assets.pic3)} src={assets.pic3} alt="" />
					<img onClick={()=>window.open(assets.pic4)} src={assets.pic4} alt="" />
					<img onClick={()=>window.open(assets.pic1)} src={assets.pic1} alt="" />
					<img onClick={()=>window.open(assets.pic2)} src={assets.pic2} alt="" />
					<img onClick={()=>window.open(assets.pic2)} src={assets.pic2} alt="" />
					<img onClick={()=>window.open(assets.pic3)} src={assets.pic3} alt="" />
					<img onClick={()=>window.open(assets.pic4)} src={assets.pic4} alt="" />
					<img onClick={()=>window.open(assets.pic1)} src={assets.pic1} alt="" />
					<img onClick={()=>window.open(assets.pic2)} src={assets.pic2} alt="" />


				</div>
			</div>

            <button onClick={()=>logout()}>Logout</button>
		</div>
	)
	:
	( 
		<div className="rs">
			<button onClick={()=>logout()}>Logout</button>

		</div>
	)
};

export default RightSidebar;
