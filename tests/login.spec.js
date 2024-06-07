// tests/login.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login'); // Replace with the actual URL of your login page
    await page.waitForURL('http://localhost:3000/login');
  });

  test('should display the login form', async ({ page }) => {
    await expect(page).toHaveTitle(/Login/); // Assuming your login page title contains "Login"
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Must be a valid email')).toBeVisible();
  });

  test('should show error message for incorrect login', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('#notistack-snackbar')).toHaveText('Invalid credentials');
  });

  test('should login successfully with correct credentials', async ({ page, context }) => {
    await page.fill('input[name="email"]', 'neer@doe.com');
    await page.fill('input[name="password"]', 'john1234sdkl!E');
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3000/dashboard/default');

    const cookies = await context.cookies();
    const accessTokenCookie = cookies.find((cookie) => cookie.name === 'accessToken');
    const refreshTokenCookie = cookies.find((cookie) => cookie.name === 'refreshToken');

    expect(accessTokenCookie).toBeTruthy();
    expect(refreshTokenCookie).toBeTruthy();

    await expect(page).toHaveURL('http://localhost:3000/dashboard/default'); // Replace with the actual URL of your dashboard
    await expect(page.locator('#notistack-snackbar')).toHaveText('Logged in successfully');
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[aria-label="toggle password visibility"]');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'text');
    await page.click('button[aria-label="toggle password visibility"]');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
  });
});
