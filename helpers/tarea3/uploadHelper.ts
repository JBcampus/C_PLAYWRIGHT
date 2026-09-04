import { Page } from '@playwright/test';
import * as path from 'path';

/**
 * Clase utilitaria para manejar la carga de archivos en los flujos de prueba.
 * @category Helper
 */
export class UploadHelper {
    private page: Page;

    /**
     * Inicializa el helper de carga.
     * @param page - Instancia de la página de Playwright.
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Sube un archivo ubicado en la carpeta 'data' usando la raíz del proyecto.
     * @param fileInputSelector - Selector CSS o XPath del input file.
     * @param fileName - Nombre del archivo con su extensión (ej. 'demo-upload.txt').
     * @returns Promesa que se resuelve cuando el archivo es cargado.
     */
    async uploadDataFile(fileInputSelector: string, fileName: string): Promise<void> {
        // process.cwd() apunta a la raíz de tu proyecto de manera segura
        const filePath = path.resolve(process.cwd(), 'data', fileName);
        await this.page.setInputFiles(fileInputSelector, filePath);
    }
}
