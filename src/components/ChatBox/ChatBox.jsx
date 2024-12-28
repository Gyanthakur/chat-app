// import React, { useContext, useEffect, useState } from "react";
// import "./ChatBox.css";
// import assets from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import {
// 	arrayUnion,
// 	doc,
// 	getDoc,
// 	onSnapshot,
// 	updateDoc,
// } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { toast } from "react-toastify";
// import upload from "../../lib/upload";
// const ChatBox = () => {
// 	const { userData, messagesId, chatUser, messages, setMessages, chatVisible, setChatVisible} =
// 		useContext(AppContext);

// 	const [input, setInput] = useState("");

// 	// const sendMessage = async () => {
// 	// 	try {
// 	// 		if (input && messagesId) {
// 	// 			await updateDoc(doc(db, "messages", messagesId), {
// 	// 				messages: arrayUnion({
// 	// 					sId: userData.id,
// 	// 					text: input,
// 	// 					createdAt: new Date(),
// 	// 					// lastSeen: new Date(),
// 	// 				}),
// 	// 			});

// 	// 			const userIds = [chatUser.rId, userData.id];

// 	// 			userIds.forEach(async (id) => {
// 	// 				const userChatsRef = doc(db, "chats", id);
// 	// 				const userChatsSnapshot = await getDoc(userChatsRef);

// 	// 				if (userChatsSnapshot.exists()) {
// 	// 					const userChatData = userChatsSnapshot.data();

// 	// 					const chatIndex = userChatData.chatsData.findIndex(
// 	// 						(c) => c.messageId === messagesId
// 	// 					);
// 	// 					userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
// 	// 					userChatData.chatsData[chatIndex].updatedAt = Date.now();
// 	// 					if (userChatData.chatsData[chatIndex].rId === userData.id) {
// 	// 						userChatData.chatsData[chatIndex].messageSeen = false;
// 	// 					}
// 	// 					await updateDoc(userChatsRef, {
// 	// 						chatsData: userChatData.chatsData,
// 	// 					});
// 	// 				}
// 	// 			});
// 	// 		}
// 	// 	} catch (error) {
// 	// 		toast.error(error.message);
// 	// 		console.log(error);
// 	// 	}

// 	// 	setInput("");
// 	// };


// 	const sendMessage = async () => {
// 		try {
// 			if (input && messagesId) {
// 				// Update the message document
// 				await updateDoc(doc(db, "messages", messagesId), {
// 					messages: arrayUnion({
// 						sId: userData.id,
// 						text: input,
// 						createdAt: new Date(),
// 					}),
// 				});
	
// 				const userIds = [chatUser.rId, userData.id];
	
// 				userIds.forEach(async (id) => {
// 					const userChatsRef = doc(db, "chats", id);
// 					const userChatsSnapshot = await getDoc(userChatsRef);
	
// 					if (userChatsSnapshot.exists()) {
// 						const userChatData = userChatsSnapshot.data();
	
// 						const chatIndex = userChatData.chatsData.findIndex(
// 							(c) => c.messageId === messagesId
// 						);
// 						userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
// 						userChatData.chatsData[chatIndex].updatedAt = Date.now();
// 						if (userChatData.chatsData[chatIndex].rId === userData.id) {
// 							userChatData.chatsData[chatIndex].messageSeen = false;
// 						}
// 						await updateDoc(userChatsRef, {
// 							chatsData: userChatData.chatsData,
// 						});
// 					}
// 				});
	
// 				// Update lastSeen for the sender
// 				await updateDoc(doc(db, "users", userData.id), {
// 					lastSeen: Date.now(),
// 				});
// 			}
// 		} catch (error) {
// 			toast.error(error.message);
// 			console.log(error);
// 		}
	
// 		setInput("");
// 	};
	
// 	const sendImage = async (e) => {
// 		try {
// 			const fileUrl = await upload(e.target.files[0]);
// 			if (fileUrl && messagesId) {
// 				await updateDoc(doc(db, "messages", messagesId), {
// 					messages: arrayUnion({
// 						sId: userData.id,
// 						image: fileUrl,
// 						createdAt: new Date(),
// 					}),
// 				});
// 				const userIds = [chatUser.rId, userData.id];

// 				userIds.forEach(async (id) => {
// 					const userChatsRef = doc(db, "chats", id);
// 					const userChatsSnapshot = await getDoc(userChatsRef);

// 					if (userChatsSnapshot.exists()) {
// 						const userChatData = userChatsSnapshot.data();

// 						const chatIndex = userChatData.chatsData.findIndex(
// 							(c) => c.messageId === messagesId
// 						);
// 						userChatData.chatsData[chatIndex].lastMessage = "Image";
// 						userChatData.chatsData[chatIndex].updatedAt = Date.now();
// 						if (userChatData.chatsData[chatIndex].rId === userData.id) {
// 							userChatData.chatsData[chatIndex].messageSeen = false;
// 						}
// 						await updateDoc(userChatsRef, {
// 							chatsData: userChatData.chatsData,
// 						});
// 					}
// 				});
// 			}
// 		} catch (error) {
// 			toast.error(error.message);
// 		}
// 	};

// 	const convertTimeStamp = (timestamp) => {
// 		let date = timestamp.toDate();
// 		const hour = date.getHours();
// 		const minute = date.getMinutes();
// 		if (hour > 12) {
// 			return hour - 12 + ":" + minute + " PM";
// 		} else {
// 			return hour + ":" + minute + " AM";
// 		}
// 	};

// const formatLastSeen = (lastSeen) => {
// 	const now = Date.now();
// 	const timeDiff = now - lastSeen;

// 	// If last seen was within the last minute
// 	// if (timeDiff <= 70000) {
// 	// 	return "Online";
// 	// }

// 	// Otherwise, calculate how long ago it was
// 	const seconds = Math.floor(timeDiff / 1000);
// 	const minutes = Math.floor(seconds / 60);
// 	const hours = Math.floor(minutes / 60);

// 	if (hours > 0) {
// 		return `Active ${hours} hour${hours > 1 ? "s" : ""} ago`;
// 	} else if (minutes > 0) {
// 		return `Active ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
// 	} else {
// 		return `Active ${seconds} second${seconds > 1 ? "s" : ""} ago`;
// 	}
// };


// 	useEffect(() => {
// 		if (messagesId) {
// 			const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
// 				setMessages(res.data().messages.reverse());
// 				console.log(res.data().messages.reverse());
// 			});
// 			return () => {
// 				unSub();
// 			};
// 		}
// 	}, [messagesId]);

// 	return chatUser ? (
// 		<div className={`chat-box ${chatVisible? '' : 'hidden'}`}>
// 		{/* <div className={`chat-box ${chatVisible ? " " : ""}`}> */}
// 			<div className="chat-user">
// 				<img src={assets.profile_img} alt="" />
// 				{/* <img src={chatUser.userData.avatar} alt="" /> */}
// 				<p >
// 					{chatUser.userData.name}
// 					<p className="lastSeen">

// 					{Date.now() - chatUser.userData.lastSeen <= 70000 ? <img className="dot" src={assets.green_dot} alt="" /> : <span>{formatLastSeen(chatUser.userData.lastSeen)}</span>}
// 					{/* {Date.now() - chatUser.userData.lastSeen} */}
// 					</p>
// 				</p>
// 				<img src={assets.help_icon} className="help" alt="" />
// 				<img onClick={()=>setChatVisible(false)} src={assets.arrow_icon} className="arrow" alt="" />
// 			</div>

// 			<div className="chat-msg">
// 				{messages.map((msg, index) => (
// 					<div
// 						key={index}
// 						className={msg.sId === userData.id ? "s-msg" : "r-msg"}
// 					>
// 						{msg["image"] ? (
// 							<img className="msg-img" src={msg.image} alt="" />
// 						) : (
// 							<p className="msg">{msg.text}</p>
// 						)}
// 						<div>
// 							<img src={assets.profile_img} alt="" />
// 							{/* <img
// 								src={
// 									msg.sId === userData.id
// 										? userData.avatar
// 										: chatUser.userData.avatar
// 								}
// 								alt=""
// 							/> */}
// 							<p>{convertTimeStamp(msg.createdAt)}</p>
// 							{/* <p>{msg.createdAt}</p> */}
// 						</div>
// 					</div>
// 				))}
// 			</div>

// 			<div className="chat-input">
// 				<input
// 					onChange={(e) => setInput(e.target.value)}
// 					value={input}
// 					type="text"
// 					placeholder="Send a message"
// 				/>
// 				<input
// 					onChange={sendImage}
// 					type="file"
// 					id="image"
// 					accept="image/png, image/jpeg"
// 					hidden
// 				/>
// 				<label htmlFor="image">
// 					<img src={assets.gallery_icon} alt="" />
// 				</label>
// 				<img onClick={sendMessage} src={assets.send_button} alt="" />
// 			</div>
// 		</div>
// 	) : (
// 		<div className={`chat-welcome ${chatVisible ? '' : 'hidden'}`}>
// 			<img src={assets.logo_icon} alt="" />
// 			<p>Chat anytime, from any where!</p>
// 		</div>
// 	);
// };

// export default ChatBox;








import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import {
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import upload from "../../lib/upload";

const ChatBox = () => {
    const { userData, messagesId, chatUser, messages, setMessages, chatVisible, setChatVisible } =
        useContext(AppContext);

    const [input, setInput] = useState("");

    const sendMessage = async () => {
        try {
            if (input && messagesId) {
                // Update the message document
                await updateDoc(doc(db, "messages", messagesId), {
                    messages: arrayUnion({
                        sId: userData.id,
                        text: input,
                        createdAt: new Date(),
                        seen: false,
                    }),
                });

                const userIds = [chatUser.rId, userData.id];

                userIds.forEach(async (id) => {
                    const userChatsRef = doc(db, "chats", id);
                    const userChatsSnapshot = await getDoc(userChatsRef);

                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data();

                        const chatIndex = userChatData.chatsData.findIndex(
                            (c) => c.messageId === messagesId
                        );
                        userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
                        userChatData.chatsData[chatIndex].updatedAt = Date.now();
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false;
                        }
                        await updateDoc(userChatsRef, {
                            chatsData: userChatData.chatsData,
                        });
                    }
                });
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

        setInput("");
    };

    const markMessageAsSeen = async () => {
        try {
            if (messagesId) {
                const messageDoc = await getDoc(doc(db, "messages", messagesId));
                if (messageDoc.exists()) {
                    const allMessages = messageDoc.data().messages;
                    const updatedMessages = allMessages.map((msg) => {
                        if (msg.sId !== userData.id && !msg.seen) {
                            return { ...msg, seen: true };
                        }
                        return msg;
                    });

                    await updateDoc(doc(db, "messages", messagesId), {
                        messages: updatedMessages,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendImage = async (e) => {
        try {
            const fileUrl = await upload(e.target.files[0]);
            if (fileUrl && messagesId) {
                await updateDoc(doc(db, "messages", messagesId), {
                    messages: arrayUnion({
                        sId: userData.id,
                        image: fileUrl,
                        createdAt: new Date(),
                        seen: false,
                    }),
                });
                const userIds = [chatUser.rId, userData.id];

                userIds.forEach(async (id) => {
                    const userChatsRef = doc(db, "chats", id);
                    const userChatsSnapshot = await getDoc(userChatsRef);

                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data();

                        const chatIndex = userChatData.chatsData.findIndex(
                            (c) => c.messageId === messagesId
                        );
                        userChatData.chatsData[chatIndex].lastMessage = "Image";
                        userChatData.chatsData[chatIndex].updatedAt = Date.now();
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false;
                        }
                        await updateDoc(userChatsRef, {
                            chatsData: userChatData.chatsData,
                        });
                    }
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const convertTimeStamp = (timestamp) => {
        let date = timestamp.toDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        if (hour > 12) {
            return hour - 12 + ":" + minute + " PM";
        } else {
            return hour + ":" + minute + " AM";
        }
    };

    useEffect(() => {
        if (messagesId) {
            const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
                const fetchedMessages = res.data().messages.reverse();
                setMessages(fetchedMessages);
                markMessageAsSeen(); // Mark messages as seen when they are fetched
            });
            return () => {
                unSub();
            };
        }
    }, [messagesId]);

    return chatUser ? (
        <div className={`chat-box ${chatVisible ? '' : 'hidden'}`}>
            <div className="chat-user">
                <img src={assets.profile_img} alt="" />
                <p>
                    {chatUser.userData.name}
                </p>
                <img onClick={() => setChatVisible(false)} src={assets.arrow_icon} className="arrow" alt="" />
            </div>

            <div className="chat-msg">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.sId === userData.id ? "s-msg" : "r-msg"}
                    >
                        {msg["image"] ? (
                            <img className="msg-img" src={msg.image} alt="" />
                        ) : (
                            <p className="msg">{msg.text}</p>
                        )}
                        <div>
                            <p>{convertTimeStamp(msg.createdAt)}</p>
                            {msg.sId === userData.id && (
                                <span>
                                    {msg.seen ? "✔✔" : "✔"}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Send a message"
                />
                <input
                    onChange={sendImage}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    hidden
                />
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt="" />
                </label>
                <img onClick={sendMessage} src={assets.send_button} alt="" />
            </div>
        </div>
    ) : (
        <div className={`chat-welcome ${chatVisible ? '' : 'hidden'}`}>
            <img src={assets.logo_icon} alt="" />
            <p>Chat anytime, from anywhere!</p>
        </div>
    );
};

export default ChatBox;
