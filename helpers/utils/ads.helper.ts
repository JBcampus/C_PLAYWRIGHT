import { BrowserContext } from '@playwright/test';

const blockedDomains = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'adservice.google.com',
];

export async function blockAds(context: BrowserContext) {
  await context.route('**/*', async route => {
    const url = route.request().url();

    const shouldBlock = blockedDomains.some(domain =>
      url.includes(domain)
    );

    if (shouldBlock) {
      await route.abort('blockedbyclient');
      return;
    }

    await route.continue();
  });
}