import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { businessSettings } from "../../db/schema.js";



export async function getSettings() {
    const [existing] = await db
        .select()
        .from(businessSettings)
        .where(
            eq(businessSettings.singleton, true)
        )
        .limit(1);

    if (existing){
        return existing;
    }

    const [created] = await db
        .insert(businessSettings)
        .values({name: "Mi negocio"})
        .returning();

    return created;
}

type UpdateSettingsInput = Partial<{
  name: string | undefined;
  logoUrl: string | undefined;
  primaryColor: string | undefined;
  timezone: string | undefined;
  qrImageUrl: string | undefined;
  openDays: string[] | undefined;
  openTime: string | undefined;
  closeTime: string | undefined;
  minBookingNoticeHours: number | undefined;
}>;

export async function updateSettings(input: UpdateSettingsInput) {

    const current = await getSettings();

    if(current){
        const [updated] = await db
        .update(businessSettings)
        .set({...input, updatedAt: new Date()})
        .where(eq(businessSettings.id, current.id))
        .returning();


        return updated
    }


}
