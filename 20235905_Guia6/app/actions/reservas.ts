"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const EsquemaReserva = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio."),
    correo: z.string().email("El correo no es válido."),
    fecha: z.string().min(1, "La fecha es obligatoria."),
    servicioId: z.coerce.number({ message: "Debe seleccionar un servicio." }),
});

export async function crearReserva(_estadoPrevio: any, formData: FormData) {
    const campos = EsquemaReserva.safeParse({
        nombre: formData.get("nombre"),
        correo: formData.get("correo"),
        fecha: formData.get("fecha"),
        servicioId: formData.get("servicioId"),
    });

    if (!campos.success) {
        return { errores: campos.error.flatten().fieldErrors, mensaje: "Error de validación." };
    }

    const fechaReserva = new Date(campos.data.fecha);

    const conflicto = await prisma.reserva.findFirst({
        where: {
            servicioId: campos.data.servicioId,
            fecha: fechaReserva,
        },
    });

    if (conflicto) {
        return {
            errores: {},
            mensaje: "Lo sentimos, este horario ya está reservado para este servicio."
        };
    }

    await prisma.reserva.create({
        data: {
            nombre: campos.data.nombre,
            correo: campos.data.correo,
            fecha: fechaReserva,
            servicioId: campos.data.servicioId,
        },
    });

    revalidatePath("/reservas");
    redirect("/reservas");
}
export async function cancelarReserva(id: number) {
    try {
        await prisma.reserva.update({
            where: { id },
            data: { estado: "cancelada" },
        });
        revalidatePath("/reservas");
        return { exito: true };
    } catch (error) {
        return { exito: false, mensaje: "No se pudo cancelar la reserva." };
    }
}
export async function confirmarReserva(id: number) {
    try {
        await prisma.reserva.update({
            where: { id },
            data: { estado: "confirmada" },
        });
        revalidatePath("/reservas");
        return { exito: true };
    } catch (error) {
        return { exito: false, mensaje: "Error al confirmar." };
    }
}