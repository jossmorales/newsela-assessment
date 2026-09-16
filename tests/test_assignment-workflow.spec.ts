import { test } from '@playwright/test';
import { LoginPage } from '../page-object/login.page';
import { AssignmentPage } from '../page-object/assignment.page';

const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;  

test('Happy Path end-to-end flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const assignmentPage = new AssignmentPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login(username, password);

  await assignmentPage.assignmentPageLoaded();
  await assignmentPage.createAssignment();
  await assignmentPage.validateContentSourceRequiredFields();
  await assignmentPage.clickNextButton();
  await assignmentPage.validateAssignmentStructureRequiredFields();
  await assignmentPage.clickNextButton();
  await assignmentPage.validatePromptRequiredFields();
  await assignmentPage.clickNextButton();
  await assignmentPage.validateAssignmentConfigurationFields();
  await assignmentPage.clickNextButton();
  await assignmentPage.validateReviewAssignmentDetails();
  await assignmentPage.saveAssignment();
  await assignmentPage.validateConfirmationMessage();

});