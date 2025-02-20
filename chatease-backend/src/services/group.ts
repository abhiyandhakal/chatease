import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { groups } from "../db/schema/group";
import { userInGroup } from "../db/schema/relations/user-in-group";
import { v4 } from "uuid";
import { error } from "elysia";
import { users } from "../db/schema/user";

class GroupService {
  async addGroupMember(id: string, groupId: string, userId: string) {
    try {
      const groupArr = await db
        .select()
        .from(groups)
        .where(eq(groups.id, groupId));
      if (groupArr.length === 0) {
        return error(404, { success: false, message: "Group not found" });
      }
      const group = groupArr[0];
      if (group.createdBy !== id) {
        return error(401, {
          success: false,
          message: "You are not the owner of this group",
        });
      }
      await db.insert(userInGroup).values({ id: v4(), groupId, userId });

      return { success: true, message: "User added to group" };
    } catch (e) {
      return error(500, { success: false, message: "Internal server error" });
    }
  }
  async getGroupMembers(id: string, groupId: string) {
    try {
      const groupMembers = await db
        .select()
        .from(userInGroup)
        .innerJoin(users, eq(users.id, userInGroup.userId))
        .where(eq(userInGroup.groupId, groupId));

      if (!groupMembers.some((groupMember) => groupMember.users.id === id)) {
        return error(401, {
          success: false,
          message: "You are not a member of this group",
        });
      }

      return {
        success: true,
        data: groupMembers.map((groupMember) => groupMember.users),
      };
    } catch (err) {
      return error(500, { success: false, message: "Internal server error" });
    }
  }

  async getAllGroups(id: string, offset: number, limit: number) {
    const groupsArr = await db
      .select()
      .from(groups)
      .innerJoin(userInGroup, eq(groups.id, userInGroup.groupId))
      .where(eq(userInGroup.userId, id))
      .limit(limit)
      .offset(offset * limit);

    return {
      success: true,
      groups: groupsArr.map((groupAndUser) => groupAndUser.groups),
    };
  }
  constructor() {}

  private async groupExists(name: string, userId: string): Promise<boolean> {
    const groupArr = await db
      .select()
      .from(groups)
      .innerJoin(userInGroup, eq(groups.id, userInGroup.groupId))
      .where(and(eq(groups.name, name), eq(userInGroup.userId, userId)));

    if (groupArr.length > 0) {
      return true;
    }
    return false;
  }

  async createGroup({
    name,
    description,
    userId,
  }: {
    name: string;
    userId: string;
    description: string;
  }) {
    const groupExists = await this.groupExists(name.trim(), userId);
    if (groupExists) {
      return error(400, {
        success: false,
        message: "Group already exists",
      });
    }

    const newGroup = await db
      .insert(groups)
      .values({
        id: v4(),
        name,
        description,
        createdBy: userId,
        createdAt: new Date().toISOString(),
      })
      .returning();

    await db
      .insert(userInGroup)
      .values({ id: v4(), groupId: newGroup[0].id, userId });

    return {
      success: true,
      group: newGroup[0],
    };
  }
}

export default GroupService;
