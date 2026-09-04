export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Genera datos válidos y únicos para el formulario de contacto.
 */
export function generateContactFormData(): ContactFormData {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    return {
        name: `Usuario ${uniqueId}`,
        email: `usuario.${uniqueId}@example.com`,
        subject: `Consulta de soporte ${uniqueId}`,
        message: `Mensaje de prueba automatizado ${uniqueId}.`,
    };
}
