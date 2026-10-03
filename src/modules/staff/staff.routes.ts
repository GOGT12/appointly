import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { addStaff, updateStaff, getStaffList, getStaffById} from "./staff.service.js";
import { addStaffBodySchema, updateStaffBodySchema, staffIdParamsSchema } from "./staff.schema.js";
import { requireAuth } from "../auth/auth.middleware.js";

export async function staffRoutes(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get(
        "/admin/staff",
        { preHandler: requireAuth },
        async (request, reply) => {
            const staff = await getStaffList();
            return reply.status(200).send(staff);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().get(
        "/admin/staff/:id",
        {
            preHandler: requireAuth,
            schema: { params: staffIdParamsSchema }
        },
        async (request, reply) => {
            const { id } = request.params;
            const staffMember = await getStaffById(id);
            return reply.status(200).send(staffMember);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().post(
        "/admin/staff",
        {
            preHandler: requireAuth,
            schema: { body: addStaffBodySchema },
        },
        async (request, reply) => {
            const newMember = await addStaff(request.body);
            return reply.status(201).send(newMember);
        }
    )

    app.withTypeProvider<ZodTypeProvider>().put(
        "/admin/staff/:id",
        {
            preHandler: requireAuth,
            schema: {
                params: staffIdParamsSchema,
                body: updateStaffBodySchema,
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            const updated = await updateStaff(id, request.body);
            return reply.status(200).send(updated)
        }
    )
}
