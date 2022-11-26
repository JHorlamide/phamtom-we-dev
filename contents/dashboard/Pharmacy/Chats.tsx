import React from 'react';

const Chats = ({ Image, styles, chats, Badge }: any) => {
  return (
    <>
      <ul className={styles.chats}>
        {chats.map((chat: any, index: any) => (
          <li key={index}>
            <div className={styles.chat}>
              <div className={styles.chat_info}>
                <Image
                  src={chat.avatar}
                  alt='avatar'
                  width={'40'}
                  height={'40'}
                  layout='fixed'
                />

                <div>
                  <p className={styles.chat_name}>{chat.name}</p>
                  <p className={styles.message}>{chat.message}</p>
                </div>
              </div>

              <div className='flex flex-col items-end'>
                <p className={styles.chat_time}>{chat.time}</p>
                <Badge color={'badge_primary'} content={chat.totalUnread} />
              </div>
            </div>

            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Chats;
