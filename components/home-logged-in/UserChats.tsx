import UserChat from "../mcsc/UserChat";

const anArray = [
  <UserChat
    key={1}
    profilePic="/"
    username="John Snow"
    lastMessage="Hello there"
    lastSeen="11:20"
    isSelected={true}
  />,
  <UserChat
    key={1}
    profilePic="/"
    username="John Snow"
    lastMessage="Hello there"
    lastSeen="11:20"
    isSelected={true}
  />,
  <UserChat
    key={1}
    profilePic="/"
    username="John Snow"
    lastMessage="Hello there"
    lastSeen="11:20"
    isSelected={true}
  />,
  <UserChat
    key={1}
    profilePic="/"
    username="John Snow"
    lastMessage="Hello there"
    lastSeen="11:20"
    isSelected={true}
  />,
  <UserChat
    key={1}
    profilePic="/"
    username="John Snow"
    lastMessage="Hello there"
    lastSeen="11:20"
    isSelected={true}
  />,
  <UserChat
    key={1}
    profilePic="/"
    username="John Snow"
    lastMessage="Hello there"
    lastSeen="11:20"
    isSelected={true}
  />,
];

const UserChats = () => {
  return (
    <section className="custom-scrollbar   m-3 h-[var(--user-chats-height)]   overflow-y-auto">
      {anArray.map((item) => item)}
    </section>
  );
};

export default UserChats;
