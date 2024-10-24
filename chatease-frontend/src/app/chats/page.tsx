import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./chats-page"), {
  ssr: false,
});

export default function Page() {
  return <DynamicComponentWithNoSSR />;
}
