import { useState, useEffect } from "react";
import { NextPage } from "next";
import {
  Badge,
  DashboardLayout,
  Input,
  Button,
  useScreenSize
} from "../../../components/dashboard";
import Image from "next/image";
import styles from "../../../styles/dashboard/Telechat.module.scss";

const Telechat: NextPage = () => {
  const screenSize = useScreenSize();
  const [selectedChat, setSelectedChat]: any = useState({});

  const chats = [
    {
      id: 1,
      name: "John Doe",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar.svg",
      time: "12:00",
      totalUnread: 21,
      messages: [
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        }
      ]
    },
    {
      id: 1,
      name: "Kiln Klone",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar_2.svg",
      time: "12:00",
      totalUnread: 10,
      messages: [
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        }
      ]
    },
    {
      id: 1,
      name: "Litre Mren",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar.svg",
      time: "12:00",
      totalUnread: 2,
      messages: [
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        }
      ]
    },
    {
      id: 1,
      name: "Doreen Anson",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar_2.svg",
      time: "12:00",
      totalUnread: 0,
      messages: [
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "Client",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        },
        {
          from: "admin",
          message: "Hello, how are you?",
          time: "October 15, 2019 10:00"
        }
      ]
    }
  ];

  const handleOpenChat = () => {
    const slider = document.getElementById("CHATS_SLIDER") as HTMLElement;
    slider.classList.add("slide_right");
  };

  const handleCloseChat = () => {
    const slider = document.getElementById("CHATS_SLIDER") as HTMLElement;
    slider.classList.remove("slide_right");
  };

  useEffect(() => {
    setSelectedChat(chats[0]);

    console.log(selectedChat);
  }, []);

  return (
    <DashboardLayout>
      <div className={styles.telechat_container}>
        <div className={styles.users}>
          <h1>Telechat</h1>

          <div>
            <div>
              <Input
                styles='input_secondary'
                placeholder='Search here'
                img='/assets/dashboard/search.svg'
                width='24px'
                height='24px'
                type={"text"}
              />

              <div>
                <ul className={styles.chats}>
                  {chats.map((chat: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleOpenChat();
                        setSelectedChat(chat);
                      }}
                    >
                      <div className={styles.chat}>
                        <div className={styles.chat_info}>
                          <Image
                            src={chat.avatar}
                            alt='avatar'
                            width={"40"}
                            height={"40"}
                            layout='fixed'
                          />

                          <div>
                            <p className={styles.chat_name}>{chat.name}</p>
                            <p className={styles.message}>{chat.message}</p>
                          </div>
                        </div>

                        <div className='flex flex-col items-end'>
                          <p className={styles.chat_time}>{chat.time}</p>
                          <Badge
                            color={"badge_primary"}
                            content={chat.totalUnread}
                          />
                        </div>
                      </div>

                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chats_room}>
          <div
            id={"CHATS_SLIDER"}
            className={`${styles.chat_room_container} ${
              screenSize.width > 700 &&
              Object.keys(selectedChat).length > 1 &&
              "slide_right"
            }`}
          >
            <div className={styles.chat_room_header}>
              <div className={styles.chat_header}>
                <Image
                  src='/assets/dashboard/arrow_left.svg'
                  alt='avatar'
                  width={"18px"}
                  height={"12px"}
                  onClick={handleCloseChat}
                />

                {/* user avarta */}
                <Image
                  src={
                    Object.keys(selectedChat).length > 0
                      ? selectedChat.avatar
                      : "/assets/dashboard/avatar.svg"
                  }
                  alt='avatar'
                  width={"40"}
                  height={"40"}
                />

                {/* user name */}
                <p>{selectedChat.name}</p>
              </div>
              <Image
                src='/assets/dashboard/more.svg'
                alt='avatar'
                width={"4px"}
                height={"16px"}
              />
            </div>

            {/* chat body */}
            <div className={styles.chat_body_container}>
              <div className={styles.chat_body}>
                {/* chats from admin && clients */}
                <div className={styles.chat_}>
                  {Object.keys(selectedChat).length > 0 &&
                    selectedChat?.messages.map((message: any, index: any) => (
                      <div
                        key={index}
                        className={
                          message.from === "Client"
                            ? styles.message_from_Client
                            : styles.message_from_Admin
                        }
                      >
                        {message.from === "Client"
                          ? (
                          <div>
                            <p className={styles.message_content}>
                              {message.message}
                            </p>
                            <p className={styles.message_time}>
                              {message.time}
                            </p>
                          </div>
                            )
                          : (
                          <div>
                            <p className={styles.message_content}>
                              {message.message}
                            </p>
                            <p className={styles.message_time}>
                              {message.time}
                            </p>
                          </div>
                            )}
                      </div>
                    ))}
                </div>
              </div>

              {/* text area */}
              <div className={styles.chat_actions}>
                <div className={styles.message_input}>
                  <Input
                    styles='input_primary'
                    type={"text"}
                    placeholder='Chat here'
                    img='/assets/dashboard/attach.svg'
                    width='20px'
                    height='11px'
                  />
                </div>

                <Button className={styles.send}>
                  <Image
                    src={"/assets/dashboard/send.svg"}
                    width={"21px"}
                    height={"18px"}
                    layout='fixed'
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Telechat;
