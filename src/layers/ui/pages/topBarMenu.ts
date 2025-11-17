import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "../base/basePage.js";
import type { AboutDialogLabelOptions, AboutDialogValuesOptions } from "./types/menu.type.js";
//import logger from "../../../config/logger/loggerManager.js";

export class TopBarMenu extends BasePage {
  private readonly upgradeButton: Locator;
  private readonly userDropdown: Locator;

  private readonly aboutMenuItem: Locator;
  private readonly supportMenuItem: Locator;
  private readonly changePasswordMenuItem: Locator;
  private readonly logoutMenuItem: Locator;

  // About Dialog
  private readonly aboutDialog: Locator;
  private readonly aboutDialogHeaderText: Locator;

  private readonly getLabelByName: (label: string) => Locator;
  private readonly getValueForLabel: (label: string) => Locator;

  constructor(page: Page) {
    super(page);

    this.upgradeButton = page.getByRole("button", { name: "Upgrade" });
    this.userDropdown = page.locator(".oxd-userdropdown-tab");

    this.aboutMenuItem = page.getByRole("menuitem", { name: "About" });
    this.supportMenuItem = page.getByRole("menuitem", { name: "Support" });
    this.changePasswordMenuItem = page.getByRole("menuitem", { name: "Change Password" });
    this.logoutMenuItem = page.getByRole("menuitem", { name: "Logout" });

    // About Dialog
    this.aboutDialog = page.locator('.oxd-dialog-sheet[role="document"]');
    this.aboutDialogHeaderText = page.getByRole("heading", { name: "About" });

    /**
     * Returns a locator for the label with the given name.
     * @param {string} label - The name of the label to search for.
     * @returns {Locator} - The locator for the label.
     */
    this.getLabelByName = (label: string) => {
      return this.aboutDialog.locator(`p.orangehrm-about-title:has-text("${label}")`);
    };

    /**
     * Returns a locator for the value of the label with the given name.
     * @param {string} label - The name of the label to search for.
     * @returns {Locator} - The locator for the value of the label.
     */
    this.getValueForLabel = (label: string) => {
      return this.getLabelByName(label)
        .locator("xpath=ancestor::div[1]")
        .locator("xpath=following-sibling::div[1]/p");
    };
  }

  // Top Bar Menu

  // Verifications

  /**
   * Verifies that the Upgrade button is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  public async verifyUpgradeButtonIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.upgradeButton,
      "verifyUpgradeButtonIsVisible",
      "visible",
    );
  }

  /**
   * Verifies that the user dropdown is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  public async verifyUserDropdownIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.userDropdown,
      "verifyUserDropdownIsVisible",
      "visible",
    );
  }

  // Actions

  /**
   * Clicks the Upgrade button.
   * @returns A promise that resolves when the element has been clicked, or rejects with an error if it fails.
   */
  public async clickUpgradeButton(): Promise<void> {
    await this.element.clickElement(this.upgradeButton, "clickUpgradeButton", "upgrade button");
  }

  /**
   * Clicks the user dropdown.
   * @returns A promise that resolves when the user dropdown has been clicked, or rejects with an error if it fails.
   */
  public async clickUserDropdown(): Promise<void> {
    await this.element.clickElement(this.userDropdown, "clickUserDropdown", "user dropdown");
  }

  // User Dropdown

  // Verifications

  /**
   * Verifies that all user dropdown menu items are visible.
   * This method first verifies that the user dropdown is visible, then verifies the visibility of the about menu item, support menu item, change password menu item, and logout menu item.
   * @returns A promise that resolves when all verifications are complete.
   */
  public async verifyUserDropdownMenuItemsAreVisible(): Promise<void> {
    await this.clickUserDropdown();

    await Promise.all([
      this.verifyAboutMenuItemIsVisible(),
      this.verifySupportMenuItemIsVisible(),
      this.verifyChangePasswordMenuItemIsVisible(),
      this.verifyLogoutMenuItemIsVisible(),
    ]);
  }

  /**
   * Verifies that the About menu item is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyAboutMenuItemIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.aboutMenuItem,
      "verifyAboutMenuItemIsVisible",
      "visible",
      "about menu item",
    );
  }

  /**
   * Verifies that the Support menu item is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifySupportMenuItemIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.supportMenuItem,
      "verifySupportMenuItemIsVisible",
      "visible",
      "support menu item",
    );
  }

  /**
   * Verifies that the Change Password menu item is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyChangePasswordMenuItemIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.changePasswordMenuItem,
      "verifyChangePasswordMenuItemIsVisible",
      "visible",
      "change password menu item",
    );
  }

  /**
   * Verifies that the Logout menu item is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyLogoutMenuItemIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.logoutMenuItem,
      "verifyLogoutMenuItemIsVisible",
      "visible",
      "logout menu item",
    );
  }

  // Actions

  /**
   * Clicks the About menu item.
   * @returns A promise that resolves when the element has been clicked, or rejects with an error if it fails.
   */
  public async clickAboutMenuItem(): Promise<void> {
    await this.element.clickElement(this.aboutMenuItem, "clickAboutMenuItem", "about menu item");
  }

  /**
   * Clicks the Support menu item.
   * @returns A promise that resolves when the element has been clicked, or rejects with an error if it fails.
   */
  public async clickSupportMenuItem(): Promise<void> {
    await this.element.clickElement(
      this.supportMenuItem,
      "clickSupportMenuItem",
      "support menu item",
    );
  }

  /**
   * Clicks the Change Password menu item.
   * @returns A promise that resolves when the element has been clicked, or rejects with an error if it fails.
   */
  public async clickChangePasswordMenuItem(): Promise<void> {
    await this.element.clickElement(
      this.changePasswordMenuItem,
      "clickChangePasswordMenuItem",
      "change password menu item",
    );
  }

  /**
   * Clicks the Logout menu item.
   * @returns A promise that resolves when the element has been clicked, or rejects with an error if it fails.
   */
  public async clickLogoutMenuItem(): Promise<void> {
    await this.element.clickElement(this.logoutMenuItem, "clickLogoutMenuItem", "logout menu item");
  }

  // About Dialog

  /**
   * Verifies that all about dialog elements are visible.
   * This method first clicks on the user dropdown, then clicks on the about menu item.
   * After that, it verifies the visibility of the about dialog header text, company name label, version label, active employees label, and employees terminated label.
   * The method returns a promise that resolves when all verifications are complete.
   */
  public async verifyAboutDialogElementsAreVisible(): Promise<void> {
    await this.clickUserDropdown();
    await this.clickAboutMenuItem();

    await Promise.all([
      this.verifyAboutDialogHeaderTextIsVisible(),
      this.verifyCompanyNameLabelIsVisible(),
      this.verifyVersionLabelIsVisible(),
      this.verifyActiveEmployeesLabelIsVisible(),
      this.verifyEmployeesTerminatedLabelIsVisible(),
    ]);
  }

  /**
   * Verifies that the header text of the about dialog is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyAboutDialogHeaderTextIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.aboutDialogHeaderText,
      "verifyAboutDialogHeaderTextIsVisible",
      "visible",
      "about dialog header text",
    );
  }

  /**
   * Verifies that the company name label is visible.
   * This method calls the verification method for the element state.
   * The method returns a promise that resolves when the verification succeeds, or rejects with an error if it fails.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyCompanyNameLabelIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.getLabelByName("Company Name:"),
      "verifyCompanyNameLabelIsVisible",
      "visible",
      "company name label",
    );
  }

  /**
   * Verifies that the version label is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyVersionLabelIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.getLabelByName("Version:"),
      "verifyVersionLabelIsVisible",
      "visible",
      "version label",
    );
  }

  /**
   * Verifies that the Active Employees label is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyActiveEmployeesLabelIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.getLabelByName("Active Employees:"),
      "verifyActiveEmployeeLabelIsVisible",
      "visible",
      "active employees label",
    );
  }

  /**
   * Verifies that the Employees Terminates label is visible.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  private async verifyEmployeesTerminatedLabelIsVisible(): Promise<void> {
    await this.elementAssertions.verifyElementState(
      this.getLabelByName("Employees Terminated:"),
      "verifyEmployeesTerminatedLabelIsVisible",
      "visible",
      "employees terminated label",
    );
  }

  // Assertions

  /**
   * Verifies that the company name, version, active employees, and employees terminated labels' text matches the expected values in the about dialog.
   * @param {AboutDialogLabelOptions} options - The options object containing the expected values for the labels.
   * @returns A promise that resolves when the verification succeeds, or rejects with an error if it fails.
   */
  public async verifyAboutDialogLabelNames(options: AboutDialogLabelOptions): Promise<void> {
    await this.clickUserDropdown();
    await this.clickAboutMenuItem();

    await Promise.all([
      this.assertCompanyNameLabel(options),
      this.assertVersionLabel(options),
      this.assertActiveEmployeesLabel(options),
      this.assertEmployeesTerminatedLabel(options),
    ]);
  }

  /**
   * Asserts that the company name label text matches the expected value.
   * @param {AboutDialogLabelOptions} options - The options object containing the expected company name.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertCompanyNameLabel(options: AboutDialogLabelOptions): Promise<void> {
    const actualCompanyName = (await this.getCompanyNameText()).trim();
    expect(actualCompanyName).toBe(options?.companyName);
  }

  /**
   * Asserts that the version label text matches the expected value.
   * @param {AboutDialogLabelOptions} options - The options object containing the expected version.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertVersionLabel(options: AboutDialogLabelOptions): Promise<void> {
    const actualVersion = (await this.getVersionText()).trim();
    expect(actualVersion).toContain(options?.version);
  }

  /**
   * Asserts that the active employees label text is greater than the expected value.
   * @param {AboutDialogLabelOptions} options - The options object containing the expected active employees.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertActiveEmployeesLabel(options: AboutDialogLabelOptions): Promise<void> {
    const actualActiveEmployees = (await this.getActiveEmployeesText()).trim();
    expect(actualActiveEmployees).toBe(options?.activeEmployees);
  }

  /**
   * Asserts that the employees terminated label text is greater than or equal to the expected value.
   * @param {AboutDialogLabelOptions} options - The options object containing the expected employees terminated.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertEmployeesTerminatedLabel(options: AboutDialogLabelOptions): Promise<void> {
    const actualEmployeesTerminated = (await this.getEmployeesTerminatedText()).trim();
    expect(actualEmployeesTerminated).toBe(options?.employeesTerminated);
  }

  // Getters

  /**
   * Retrieves the text content from the company name label.
   * @returns A promise that resolves with the text content from the company name label.
   */
  private async getCompanyNameText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getLabelByName("Company Name:"),
      "getCompanyNameText",
      "textContent",
      undefined,
      "company name",
    );
  }

  /**
   * Retrieves the text content from the version label.
   * @returns A promise that resolves with the text content from the version label.
   */
  private async getVersionText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getLabelByName("Version:"),
      "getVersionText",
      "textContent",
      undefined,
      "version",
    );
  }

  /**
   * Retrieves the text content from the active employees label.
   * @returns A promise that resolves with the text content from the active employees label.
   */
  private async getActiveEmployeesText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getLabelByName("Active Employees:"),
      "getActiveEmployeesText",
      "textContent",
      undefined,
      "active employees",
    );
  }

  /**
   * Retrieves the text content from the employees terminated label.
   * @returns A promise that resolves with the text content from the employees terminated label.
   */
  private async getEmployeesTerminatedText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getLabelByName("Employees Terminated:"),
      "getEmployeesTerminatedText",
      "textContent",
      undefined,
      "employees terminated",
    );
  }

  // Values

  // Assertions

  /**
   * Verifies that all about dialog values match the expected values.
   * This method first clicks on the user dropdown, then clicks on the about menu item.
   * After that, it verifies the values of the company name, version, active employees, and employees terminated.
   * @param {AboutDialogValuesOptions} options - The options object containing the expected values for the labels.
   * @returns {Promise<void>} - A promise that resolves when all verifications are complete.
   */
  public async verifyAboutDialogValuesForLabels(options: AboutDialogValuesOptions): Promise<void> {
    await this.clickUserDropdown();
    await this.clickAboutMenuItem();

    await Promise.all([
      this.assertCompanyNameValue(options),
      this.assertVersionValue(options),
      this.assertActiveEmployeesValue(options),
      this.assertEmployeesTerminatedValue(options),
    ]);
  }

  /**
   * Asserts that the company name value text matches the expected value.
   * @param {AboutDialogValuesOptions} options - The options object containing the expected company name.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertCompanyNameValue(options: AboutDialogValuesOptions): Promise<void> {
    const actualValue = (await this.getCompanyNameValueText()).trim();
    expect(actualValue).toBe(options?.companyName);
  }

  /**
   * Asserts that the version value text matches the expected value.
   * @param {AboutDialogValuesOptions} options - The options object containing the expected version.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertVersionValue(options: AboutDialogValuesOptions): Promise<void> {
    const actualValue = (await this.getVersionValueText()).trim();
    expect(actualValue).toContain(options?.version);
  }

  /**
   * Asserts that the active employees value text is greater than the expected value.
   * @param {AboutDialogValuesOptions} options - The options object containing the expected active employees value.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertActiveEmployeesValue(options: AboutDialogValuesOptions): Promise<void> {
    const actualValueText = await this.getActiveEmployeesValueText();
    const actualValue = Number(actualValueText?.trim());

    if (options?.activeEmployees !== undefined) {
      const expectedValue = Number(options.activeEmployees);
      expect(actualValue).toBeGreaterThan(expectedValue);
    }
  }

  /**
   * Asserts that the employees terminated value text is greater than or equal to the expected value.
   * @param {AboutDialogValuesOptions} options - The options object containing the expected employees terminated.
   * @returns {Promise<void>} - A promise that resolves when the assertion is successful, or rejects with an error if it fails.
   */
  private async assertEmployeesTerminatedValue(options: AboutDialogValuesOptions): Promise<void> {
    const actualValueText = await this.getEmployeesTerminatedValueText();
    const actualValue = Number(actualValueText?.trim());

    if (options?.employeesTerminated !== undefined) {
      const expectedValue = Number(options.employeesTerminated);
      expect(actualValue).toBeGreaterThanOrEqual(expectedValue);
    }
  }

  // Getters

  /**
   * Retrieves the text content from the company name value element.
   * @returns A promise that resolves with the text content from the company name value element.
   */
  private async getCompanyNameValueText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getValueForLabel("Company Name:"),
      "getCompanyNameValueText",
      "textContent",
      undefined,
      "company name value",
    );
  }

  /**
   * Retrieves the text content from the version value element.
   * @returns A promise that resolves with the text content from the version value element.
   */
  private async getVersionValueText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getValueForLabel("Version:"),
      "getVersionValueText",
      "textContent",
      undefined,
      "version value",
    );
  }

  /**
   * Retrieves the text content from the active employees value element.
   * @returns A promise that resolves with the text content from the active employees value element.
   */
  private async getActiveEmployeesValueText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getValueForLabel("Active Employees:"),
      "getActiveEmployeesValueText",
      "textContent",
      undefined,
      "active employees value",
    );
  }

  /**
   * Retrieves the text content from the employees terminated value element.
   * @returns A promise that resolves with the text content from the employees terminated value element.
   */
  private async getEmployeesTerminatedValueText() {
    return await this.elementAssertions.getElementProperty<string>(
      this.getValueForLabel("Employees Terminated:"),
      "getEmployeesTerminatedValueText",
      "textContent",
      undefined,
      "employees terminated value",
    );
  }
}
