import {Page, expect, Locator} from "@playwright/test";

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByLabel('UsernameRequired');
        this.passwordInput = this.page.getByLabel('PasswordRequired');
        this.loginButton = this.page.getByTestId('sign_in_button');
    }

    //methods to interact with the page elements
    async fillUsername(username: string) {
        await expect(this.usernameInput).toBeVisible();
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

    //method
    async login(username: string, password: string) {
        if (!username || !password) {
            throw new Error('Username and password are required for login.');
        }
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.validateValuesPopulated(username, password);
        await this.clickLoginButton();
    }

    //method to navigate to the login page
    async gotoLoginPage() {
        await this.page.goto('https://writing.app.newsela.com/assignments');
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await this.page.waitForLoadState('networkidle'); 
    }

    async validateValuesPopulated(username: string, password: string) {
        await expect(this.usernameInput).toHaveValue(username);
        await expect(this.passwordInput).toHaveValue(password);
    }
}

