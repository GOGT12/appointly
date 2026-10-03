import { describe, it, expect } from "vitest";
import {
  addStaff,
  updateStaff,
  getStaffList,
  getStaffById,
} from "./staff.service.js";
import { NotFoundError } from "../../shared/errors.js";

const sampleStaff = {
  name: "María Pérez",
  email: "maria@gmail.com",
  phone: "77712345",
  daysOff: ["sun"],
};

describe("staff.service", () => {
  it("addStaff crea una empleada y la devuelve con id", async () => {
    const created = await addStaff(sampleStaff);

    expect(created.id).toBeTypeOf("string");
    expect(created.name).toBe(sampleStaff.name);
    expect(created.isActive).toBe(true);
    expect(created.daysOff).toEqual(["sun"]);
  });

  it("addStaff permite crear sin phone ni daysOff (son opcionales)", async () => {
    const created = await addStaff({
      name: "Lucía Gómez",
      email: "lucia@gmail.com",
    });

    expect(created.phone).toBeNull();
    expect(created.daysOff).toEqual([]);
  });

  it("getStaffById devuelve la empleada correcta", async () => {
    const created = await addStaff(sampleStaff);

    const found = await getStaffById(created.id);

    expect(found.id).toBe(created.id);
    expect(found.email).toBe(sampleStaff.email);
  });

  it("getStaffById lanza NotFoundError si el id no existe", async () => {
    const fakeId = "00000000-0000-0000-0000-000000000000";

    await expect(getStaffById(fakeId)).rejects.toThrow(NotFoundError);
  });

  it("getStaffList incluye tanto activas como inactivas", async () => {
    const active = await addStaff({ ...sampleStaff, email: "activa@gmail.com" });
    const inactive = await addStaff({ ...sampleStaff, email: "inactiva@gmail.com" });
    await updateStaff(inactive.id, { isActive: false });

    const list = await getStaffList();
    const ids = list.map((s) => s.id);

    expect(ids).toContain(active.id);
    expect(ids).toContain(inactive.id);
  });

  it("updateStaff actualiza solo los campos enviados", async () => {
    const created = await addStaff(sampleStaff);

    const updated = await updateStaff(created.id, { phone: "77799999" });

    expect(updated.phone).toBe("77799999");
    expect(updated.name).toBe(sampleStaff.name); // no debería cambiar
  });

  it("updateStaff puede desactivar una empleada", async () => {
    const created = await addStaff(sampleStaff);

    const updated = await updateStaff(created.id, { isActive: false });

    expect(updated.isActive).toBe(false);
  });

  it("updateStaff lanza NotFoundError si el id no existe", async () => {
    const fakeId = "00000000-0000-0000-0000-000000000000";

    await expect(updateStaff(fakeId, { phone: "123" })).rejects.toThrow(NotFoundError);
  });
});
