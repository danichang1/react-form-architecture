import { test, expect } from '@playwright/test';

test.describe('Test Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('renders form fields and submit button', async ({ page }) => {
    await expect(page.getByLabel('String')).toBeVisible();
    await expect(page.getByLabel('Integer')).toBeVisible();
    await expect(page.getByLabel('Positive Float')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('submit button is disabled on initial render', async ({ page }) => {
    const submit = page.getByRole('button', { name: 'Submit' });
    await expect(submit).toBeDisabled();
  });

  test('shows validation errors for invalid inputs', async ({ page }) => {
    await page.getByLabel('String').fill('hello');

    await page.getByLabel('Integer').fill('1.5'); // invalid int
    await page.getByLabel('Positive Float').fill('-3'); // invalid positive

    // blur triggers validation
    await page.getByLabel('Integer').blur();
    await page.getByLabel('Positive Float').blur();

    await expect(page.getByText('Integer must be a whole number')).toBeVisible();
    await expect(page.getByText('Positive float must be positive')).toBeVisible();
  });

  test('successful submit shows snackbar with parsed JSON', async ({ page }) => {
    await page.getByLabel('String').fill('test-value');
    await page.getByLabel('Integer').fill('42');
    await page.getByLabel('Positive Float').fill('3.14');

    const submit = page.getByRole('button', { name: 'Submit' });

    // wait until form becomes valid
    await expect(submit).toBeEnabled();

    await submit.click();

    // snackbar should appear
    const snackbar = page.getByText(/test-value/);
    await expect(snackbar).toBeVisible();

    // verify JSON structure is correct
    await expect(snackbar).toContainText('"string":"test-value"');
    await expect(snackbar).toContainText('"integer":42');
    await expect(snackbar).toContainText('"positiveFloat":3.14');
  });

  test('integer field rejects non-numeric input', async ({ page }) => {
    await page.getByLabel('Integer').fill('abc');
    await page.getByLabel('Integer').blur();

    await expect(page.getByText('Integer must be a number')).toBeVisible();
  });
});
