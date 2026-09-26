import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { listServicesForAdmin, getServiceByIdForAdmin, listPublicServices,
    getPublicServiceById, addService, updateService,
    } from "./catalog.service.js";
import { createServiceBodySchema, updateServiceBodySchema, serviceIdParamsSchema } from "./catalog.schema.js";
import { requireAuth } from "../auth/auth.middleware.js";


export async function catalogRoutes(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get(
        "/admin/catalog",
        {preHandler: requireAuth},
        async(request, reply) => {
            const services = await listServicesForAdmin();
            return reply.status(200).send(services);
        }
    );

    app.withTypeProvider<ZodTypeProvider>().get(
        "/admin/catalog/:id",
        {
            preHandler: requireAuth,
            schema: {params: serviceIdParamsSchema },
        },
        async(request, reply) => {
            const {id} = request.params;
            const service = await getServiceByIdForAdmin(id);
            return reply.status(200).send(service);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().get(
        "/catalog",
        async(request,reply) => {
            const services = await listPublicServices();
            return reply.status(200).send(services);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().get(
        "/catalog/:id",
        {
            schema: {params: serviceIdParamsSchema},
        },
        async(request,reply) => {
            const {id} = request.params;
            const services = await getPublicServiceById(id);
            return reply.status(200).send(services);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().post(
        "/admin/catalog",
        {
            preHandler: requireAuth,
            schema: {body: createServiceBodySchema},
        },
        async(request,reply) => {
            const newService = await addService(request.body);
            return reply.status(201).send(newService);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().put(
        "/admin/catalog/:id",
        {
            preHandler: requireAuth,
            schema: {
                params: serviceIdParamsSchema,
                body: updateServiceBodySchema,
            }
        },
        async(request,reply) => {
            const {id} = request.params;
            const updatedService = await updateService(id, request.body);
            return reply.status(200).send(updatedService);
        }
    )
}
