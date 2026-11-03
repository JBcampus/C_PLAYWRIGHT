import * as path from 'node:path';
/**
 * Helper with Test data used by the Tarea3 contact and purchase flow.
 * 
 */

/** Base URL of the site under test. */
export const BASE_URL = 'https://automationexercise.com/';

/** Absolute path of the txt file uploaded in the contact form. */
export const FILE_PATH = path.join(__dirname, '../../data/demo-upload.txt');

/** Data typed in the "contact_us" form (no real data). */
export const contactData = {
    name: 'Maria',
    email: 'maria@example.com',
    subject: 'Subject Test',
    message: 'I want to get the new collection ...',
};


