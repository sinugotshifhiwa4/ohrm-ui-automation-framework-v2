import { test } from "../../../fixtures/test.fixtures.js";
import logger from "../../../src/config/logger/loggerManager.js";

test.describe("Topbar Menu Test Suite @regression @sanity", () => {
  test.beforeEach(async ({ loginOrchestrator }) => {
    await loginOrchestrator.navigateToPortal();
  });

  test("should display all user dropdown menu items", async ({ topBarMenu }) => {
    await topBarMenu.verifyUserDropdownMenuItemsAreVisible();
    logger.info("Assertion Passed: All side menus are visible");
  });

  test("should display all about dialog elements", async ({ topBarMenu }) => {
    await topBarMenu.verifyAboutDialogElementsAreVisible();
    logger.info("Assertion Passed: All about dialog elements are visible");
  });

  test("should verify all labels inside the About dialog", async ({ topBarMenu }) => {
    await topBarMenu.verifyAboutDialogLabelNames({
      companyName: "Company Name:",
      version: "Version:",
      activeEmployees: "Active Employees:",
      employeesTerminated: "Employees Terminated:",
    });
    logger.info("Assertion Passed: All about dialog labels are visible");
  });

  test("should verify dialog label values", async ({ topBarMenu }) => {
    await topBarMenu.verifyAboutDialogValuesForLabels({
      companyName: "OrangeHRM",
      version: "OrangeHRM OS",
      activeEmployees: 0,
      employeesTerminated: 0,
    });
    logger.info("Assertion Passed: All about dialog label values are visible");
  });
});
