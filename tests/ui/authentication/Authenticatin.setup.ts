import { test as authentication } from "../../../fixtures/test.fixtures.js";
import logger from "../../../src/config/logger/loggerManager.js";

/**
 * Authentication Test Fixture
 *
 * This test handles the portal authentication setup for other tests.
 * It retrieves portal credentials from the environment resolver and
 * performs login via the login orchestrator. The session state is
 * saved for reuse in subsequent tests to avoid repeated logins.
 *
 * Tags:
 *  - @authenticate : Marks this as an authentication test
 *  - @sanity       : Can be included in sanity test runs
 *  - @regression   : Can be included in regression test runs
 */
authentication(
  `Authenticate @authenticate @sanity @regression`,
  async ({ runtimeResolver, loginOrchestrator, loginPage }) => {
    const { username, password } = await runtimeResolver.getPortalCredentials();

    await loginOrchestrator.loginWithValidCredentials(
      async () => await loginPage.login(username, password),
      async () => await loginPage.verifyInvalidLoginErrorMessageIsNotVisible(),
    );

    logger.info("Verified: Authentication session state setup completed and saved successfully.");
  },
);
