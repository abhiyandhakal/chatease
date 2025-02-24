"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ChatSection from "./chat-section";
import { useAtomValue } from "jotai";
import { chatSelectedAtom } from "@/store/chat";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import AddMember from "@/components/custom/add-member";

export default function Topbar() {
  const chatSelected = useAtomValue(chatSelectedAtom);
  const [isOpen, setIsOpen] = useState(false);
  const isGroup = chatSelected?.type === "group";
  const groupMembers = isGroup ? chatSelected.users : [];
  const groupOwner = isGroup ? chatSelected.owner : null;

  return (
    <SidebarProvider
      defaultOpen={true}
      className="w-full"
      style={{ "--sidebar-width": "24rem" } as React.CSSProperties}
    >
      <div className="w-full">
        <div className="border h-10 shadow w-full flex items-center justify-end px-5">
          <SidebarTrigger className="rotate-180" />
        </div>
        <ChatSection />
      </div>
      <div className="flex min-h-screen">
        <Sidebar side="right" className="border-l">
          <SidebarHeader className="border-b p-4">
            <h2 className="font-semibold">Details</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className="p-4">
              {chatSelected?.type === "direct" && (
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage
                    src={
                      chatSelected.user.profilePic
                        ? chatSelected.user.profilePic
                        : undefined
                    }
                    alt={chatSelected.user.fullName}
                  />
                  <AvatarFallback>
                    {chatSelected.user.fullName
                      .toUpperCase()
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <h1 className="font-semibold text-xl text-center">
                {isGroup ? chatSelected.name : chatSelected?.user.fullName}
              </h1>
              <h2 className="text-secondary-foreground text-center px-4">
                {isGroup
                  ? chatSelected.description
                  : chatSelected?.user.username}
              </h2>
            </div>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="space-y-2"
            >
              {isGroup && (
                <>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border px-4 py-3 font-medium transition-colors hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <span>Team Members</span>
                      <Badge variant="secondary">{groupMembers.length}</Badge>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <AddMember groupId={chatSelected.id} />
                </>
              )}
              <CollapsibleContent className="space-y-2">
                {groupMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            member.profilePic ? member.profilePic : undefined
                          }
                          alt={member.fullName}
                        />
                        <AvatarFallback>
                          {member.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {member.id === groupOwner?.id
                            ? `${member.fullName} (Owner)`
                            : member.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          @{member.username}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={member.is_online ? "default" : "secondary"}
                      className={cn(
                        "ml-auto",
                        member.is_online &&
                          "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
                      )}
                    >
                      {member.is_online ? "Online" : "Offline"}
                    </Badge>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
