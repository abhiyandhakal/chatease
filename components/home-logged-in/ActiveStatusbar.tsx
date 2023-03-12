import UserDisplayBtn from "../mcsc/UserDisplayBtn";

const anArray = [
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
  <UserDisplayBtn profilePic="" key={1} isActive username="hellooworldldl" />,
];

const ActiveStatusbar = () => {
  return (
    <section className="custom-scrollbar m-3 grid h-[var(--active-statusbar-height)] auto-cols-[19%] grid-flow-col gap-3 overflow-x-auto rounded-xl bg-[var(--bg-primary)] p-6 ">
      {anArray.map((item) => item)}
    </section>
  );
};

export default ActiveStatusbar;
