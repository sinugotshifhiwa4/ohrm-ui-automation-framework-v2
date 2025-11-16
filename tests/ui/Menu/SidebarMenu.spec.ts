import { test } from "../../../fixtures/test.fixtures.js";
import logger from "../../../src/config/logger/loggerManager.js";

test.describe("Sidebar Menu Test Suite @regression @sanity", () => {
  test.beforeEach(async ({ loginOrchestrator }) => {
    await loginOrchestrator.navigateToPortal();
  });

  test("should display all side menus", async ({ sideBarMenu }) => {
    await sideBarMenu.verifySideBarElementsAreVisible();
    logger.info("Verified: All side menus are visible");
  });

  test("should display only menu icons when the sidebar is collapsed", async ({ sideBarMenu }) => {
    await sideBarMenu.verifySideMenuItemsBasedOnState({ state: "collapsed" });
    logger.info("Verified: Only menu icons are visible when the sidebar is collapsed");
  });

  test("should display labels names when the sidebar is expanded", async ({ sideBarMenu }) => {
    await sideBarMenu.verifySideMenuItemsBasedOnState({ state: "expanded" });
    logger.info("Verified: All menus labels are visible when the sidebar is expanded");
  });
});
