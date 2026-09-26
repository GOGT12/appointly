import { describe, it, expect } from "vitest";
import {
  addService,
  updateService,
  getServiceByIdForAdmin,
  getPublicServiceById,
  listServicesForAdmin,
  listPublicServices,
} from "./catalog.service.js";
import { NotFoundError } from "../../shared/errors.js";

const sampleService = {
  name: "Lifting de pestañas",
  description: "Lifting clásico con tinte",
  durationMinutes: 60,
  price: 15000,
  imageUrl: "https://ejemplo.com/img.jpg",
};

describe("catalog.service", () => {
  it("addService crea un servicio y lo devuelve con id", async () => {
    const created = await addService(sampleService);

    expect(created.id).toBeTypeOf("string");
    expect(created.name).toBe(sampleService.name);
    expect(created.isActive).toBe(true);
  });

  it("getServiceByIdForAdmin devuelve el servicio con todos los campos", async () => {
    const created = await addService(sampleService);

    const found = await getServiceByIdForAdmin(created.id);

    expect(found.id).toBe(created.id);
    expect(found.description).toBe(sampleService.description);
    expect(found.createdAt).toBeDefined();
  });

  it("getServiceByIdForAdmin lanza NotFoundError si el id no existe", async () => {
    const fakeId = "00000000-0000-0000-0000-000000000000";

    await expect(getServiceByIdForAdmin(fakeId)).rejects.toThrow(NotFoundError);
  });

  it("listPublicServices solo muestra servicios activos", async () => {
    const active = await addService({ ...sampleService, name: "Servicio activo" });
    const toDeactivate = await addService({ ...sampleService, name: "Servicio inactivo" });

    await updateService(toDeactivate.id, { isActive: false });

    const publicList = await listPublicServices();
    const ids = publicList.map((s) => s.id);

    expect(ids).toContain(active.id);
    expect(ids).not.toContain(toDeactivate.id);
  });

  it("getPublicServiceById lanza NotFoundError si el servicio está inactivo", async () => {
    const created = await addService(sampleService);
    await updateService(created.id, { isActive: false });

    await expect(getPublicServiceById(created.id)).rejects.toThrow(NotFoundError);
  });

  it("updateService actualiza solo los campos enviados", async () => {
    const created = await addService(sampleService);

    const updated = await updateService(created.id, { price: 20000 });

    expect(updated.price).toBe(20000);
    expect(updated.name).toBe(sampleService.name); // no debería cambiar
  });

  it("updateService lanza NotFoundError si el id no existe", async () => {
    const fakeId = "00000000-0000-0000-0000-000000000000";

    await expect(updateService(fakeId, { price: 1000 })).rejects.toThrow(NotFoundError);
  });

  it("listServicesForAdmin incluye tanto activos como inactivos", async () => {
    const active = await addService({ ...sampleService, name: "Activo para admin" });
    const inactive = await addService({ ...sampleService, name: "Inactivo para admin" });
    await updateService(inactive.id, { isActive: false });

    const adminList = await listServicesForAdmin();
    const ids = adminList.map((s) => s.id);

    expect(ids).toContain(active.id);
    expect(ids).toContain(inactive.id);
  });
});
