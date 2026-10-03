import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { staff } from "../../db/schema.js";
import { NotFoundError } from "../../shared/errors.js";

type NewStaff = {
  name: string;
  email: string;
  phone?: string | undefined;
  daysOff?: string[] | undefined;
};

export async function addStaff(input: NewStaff) {
  const [newStaff] = await db
    .insert(staff)
    .values(input)
    .returning();

  if (!newStaff) {
    throw new Error("No se pudo crear la empleada");
  }

  return newStaff;
}

type UpdateStaffInput = Partial<{
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  daysOff: string[] | undefined;
  isActive: boolean | undefined;
}>;

export async function updateStaff(id: string, input: UpdateStaffInput) {
  const [updated] = await db
    .update(staff)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(staff.id, id))
    .returning();

  if (!updated) {
    throw new NotFoundError("Empleada");
  }

  return updated;
}

export async function getStaffList() {
  return db.select().from(staff);
}

export async function getStaffById(id: string) {
  const [found] = await db
    .select()
    .from(staff)
    .where(eq(staff.id, id));

  if (!found) {
    throw new NotFoundError("Empleada");
  }

  return found;
}
