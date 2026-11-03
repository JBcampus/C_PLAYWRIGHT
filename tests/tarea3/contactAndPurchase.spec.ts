
/**
     * Validates that the browser is on the expected URL.
     * @param url - Full URL expected in the browser.
     */
    async verifyUrl(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }