import path from 'path';

/** Datos ficticios utilizados para completar el formulario de contacto. */
export const contactData = {
  name: 'Usuario Prueba',
  email: 'usuario.prueba@example.com',
  subject: 'Test de formulario',
  message: 'Este mensaje fue enviado como parte de una prueba',
};

/** Ruta absoluta del archivo de texto que se adjunta al.formulario. */
export const contactFilePath = path.resolve(process.cwd(), 'data', 'demo-upload.txt');
