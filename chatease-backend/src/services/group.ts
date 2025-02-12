import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { groups } from "../db/schema/group";
import { userInGroup } from "../db/schema/relations/user-in-group";
import { v4 } from "uuid";

class GroupService {
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
      return {
        success: false,
        message: "Group already exists",
      };
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
