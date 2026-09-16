# Test Plan

## Objective

Validate the end-to-end assignment creation workflow in Newsela using Playwright. The automated suite verifies that a user can sign in, navigate to the assignment flow, complete each required step, and successfully save an assignment.

## Scope

### In scope
- User login with valid credentials
- Navigation to the assignments page
- Creation of a new assignment
- Validation of required fields in each assignment modal
- Review of assignment details before save
- Confirmation message after assignment creation

### Out of scope
- Negative login scenarios
- Multiple browser coverage beyond Chromium
- API validation
- Performance testing
- Accessibility audits beyond basic visibility checks

## Test Environment

- Application under test: Newsela writing assignment flow
- Framework: Playwright
- Browser: Chromium
- Credentials: loaded from `.env` as `USERNAME` and `PASSWORD`

## Test Approach

This project uses a page object model with structured interactions for:
- `LoginPage`
- `AssignmentPage`

The test validates required UI behavior rather than backend logic, focusing on the user journey and field completeness in the assignment wizard.

## Test Cases

### 1. Login flow

#### TC-01: User can open the login page
- Navigate to the assignments URL
- Verify the username, password and loginbutton fields are visible

#### TC-02: Validate forgot password (PTA)
- Validate the link is available
- Validate a correct email send the information to change the password
- Validate an invalid email error message

#### TC-03: User can sign in with valid credentials
- Enter a valid username
- Enter a valid password
- Verify the input values match what was entered
- Click the sign-in button
- Confirm navigation continues to the assignments page

### 2. Assignment creation workflow

#### TC-04: Assignment page loads correctly
- Verify the page contains the assignment area
- Verify the Create Assignment button is visible and clickable

#### TC-05: User can start a new assignment
- Click Create Assignment
- Confirm the assignment creation flow begins

#### TC-06: Content source step validates required elements
- Verify the modal title is visible
- Verify the content input is visible
- Verify Add button is available

#### TC-07: User can proceed to the assignment structure step
- Verify the Assignment Structure modal is present
- Verify assignment title input is visible
- Verify minimum and maximum word count controls are visible

#### TC-08: User can proceed to the prompt step
- Verify the prompt modal is present
- Verify the prompt field is visible and editable and not empty.
- Verify the prompt length is below the expected maximum
- Valid prompt is added in the textbox. Topics related to students based on the grade.
- Validate the prompt lenght is more than minimun value. It cannot be too short.
- Add test data and validate "regenerate prompt button" add the expected data.
- Validate images and files are allowed to add.
- Validate cancel generating button does not add test data into the textbox.
    - Validate message to add the prompt data in the field.
    - Validate next button is displayed
    - Validate an error if prompt is empty.

#### TC-08: User can proceed to assignment configuration step
- Verify the Assignment Configurations modal is present
- Verify rubric selection is visible and populated

#### TC-09: User can review assignment details before saving
- Verify the Review Assignment Details modal is present
- Verify assignment name and prompt are visible
- Verify review configuration information is visible

#### TC-10: User can save and confirm assignment creation
- Click Save assignment
- Verify the success confirmation message appears
- Verify the assignment link or reference is present

## Entry Criteria

- Username
- password
- valid prompt to create an asignment.

## Exit Criteria

- Test workflow completes successfully without failure
- Required UI elements are present at each step
- Assignment is saved and confirmation appears

## Risks and Dependencies

- Authentication credentials must be valid for the environment
- UI labels or selectors may change if the application updates
- The workflow depends on the Newsela assignment UI remaining stable

## Success Criteria

The test passes when the assignment wizard can be completed in a single happy-path flow with all required validation checks succeeding.
