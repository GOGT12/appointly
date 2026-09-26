import { eq, and } from "drizzle-orm";
import { db } from "../../db/client.js";
import { catalogServices } from "../../db/schema.js";
import { NotFoundError } from "../../shared/errors.js";



// Lista para el admin — resumida, incluye activos e inactivos
export async function listServicesForAdmin() {
    return db
        .select({
            id: catalogServices.id,
            name: catalogServices.name,
            price: catalogServices.price,
            isActive: catalogServices.isActive,
        })
        .from(catalogServices);
}

// Detalle para el admin — todo, para editar
export async function getServiceByIdForAdmin(id: string) {
    const [service] = await db
        .select()
        .from(catalogServices)
        .where(eq(catalogServices.id, id));

    if (!service){
        throw new NotFoundError("Servicio")
    }

    return service;
}

// Lista pública — resumida, solo activos
export async function listPublicServices() {
    return db
        .select({
            id: catalogServices.id,
            name: catalogServices.name,
            price: catalogServices.price,
            imageUrl: catalogServices.imageUrl,
        })
        .from(catalogServices)
        .where(eq(catalogServices.isActive, true));
}

// Detalle público — completo, solo si está activo
export async function getPublicServiceById(id: string) {
    const [service] = await db
        .select({
            id: catalogServices.id,
            name: catalogServices.name,
            description: catalogServices.description,
            durationMinutes: catalogServices.durationMinutes,
            price: catalogServices.price,
            imageUrl: catalogServices.imageUrl,
        })
        .from(catalogServices)
        .where(
            and(
                eq(catalogServices.id, id),
                eq(catalogServices.isActive, true)
            )
        );

    if (!service){
        throw new NotFoundError("Servicio");
    }

    return service;
}



type NewService = {
    name: string;
    description: string;
    durationMinutes: number;
    price: number;
    imageUrl: string;
}

export async function addService(input: NewService) {

    const [newService] = await db
        .insert(catalogServices)
        .values(input)
        .returning();

    if (!newService){
        throw new Error("No se pudo crear el servicio");
    }
    return newService;
}

type UpdateServiceInput = Partial <{

    name: string | undefined;
    description: string | undefined;
    durationMinutes: number | undefined;
    price: number | undefined;
    imageUrl: string | undefined;
    isActive: boolean | undefined;

}>
export async function updateService(id: string,input: UpdateServiceInput) {

    const [updated] = await db
        .update(catalogServices)
        .set({...input, updatedAt: new Date()})
        .where(
            eq(catalogServices.id, id)
        )
        .returning();

    if (!updated){
        throw new NotFoundError("Servicio");
    }

    return updated
}
