import {Page, expect, Locator} from "@playwright/test";

export class AssignmentPage {
    private page: Page;
    private assignmentTile: Locator;
    private assigmentButton: Locator;

    //locator for modals
    private modalTitle: Locator;
    private contentText: Locator;
    private addContentButton: Locator;
    private nextButton: Locator;
    private titleAssigment: Locator;
    private minWordCount: Locator;
    private maxWordCount: Locator;
    private promptText: Locator;
    private rubricOption: Locator;
    private assignmentName: String;

    //review assignment details
    private reviewAssignmentName: Locator;
    private reviewPromptText: Locator;
    private reviewConfig: Locator;
    private saveAssignmentButton: Locator;

    //confirmation message
    private confirmationTitle: Locator;
    private confirmationMessage: Locator;
    private copyLinkButton: Locator;
    private linkText: Locator;
    private linkTextValue: String;

    constructor(page: Page) {
        this.page = page;
        this.assignmentTile = this.page.getByRole('heading', {name: 'Assignments'});
        this.assigmentButton = this.page.locator('button').filter({hasText: 'Create Assignment'});
        //modal #1
        this.contentText = this.page.getByPlaceholder('www.newsela.com');
        this.addContentButton = this.page.getByRole('button', {name: 'Add'});
        this.nextButton = this.page.getByRole('button', {name: 'Next'});
        this.assignmentName = '';
        //modal #2
        this.titleAssigment = this.page.getByPlaceholder('Type here');
        this.minWordCount = this.page.getByRole('combobox', { name: 'Minimum word count' });
        this.maxWordCount = this.page.getByRole('combobox', { name: 'Maximum word count' });
        //modal #3
        this.promptText = this.page.getByRole('textbox', { name: 'Assignment writing prompt' });
        //modal #4
        this.rubricOption = this.page.getByRole('combobox', { name: 'Rubrics Selection Required' });

        //modal #5
        this.reviewAssignmentName = this.page.getByRole('textbox', { name: 'Required' });
        this.reviewPromptText = this.page.getByRole('region', { name: 'Prompt' });
        this.reviewConfig = this.page.getByText('Rubric: General Purpose Literary Analysis Grades 4-12Sentence Labels: Addresses');
        this.saveAssignmentButton = this.page.getByRole('button', { name: 'Save assignment' });

        //message confirmation
        this.confirmationTitle = this.page.getByRole('heading', { name: 'Your assignment is ready' });
        this.confirmationMessage = this.page.getByText('This assignment will not be');
        this.copyLinkButton = this.page.getByRole('button', { name: 'Copy link' });
        this.linkText = this.page.getByRole('textbox', { name: 'Required' });
        this.linkTextValue = '';
    }   

    async assignmentPageLoaded(){
        await expect(this.assigmentButton).toBeVisible();
    }
    //Click on the "Create Assignment" button to start the assignment creation process
    async createAssignment() {
        await this.assigmentButton.click();
    }
    
    //Create a method with a parameter to validate the modal title based on the provided title
    async validateModalTitle(title: string){
        this.modalTitle = this.page.getByRole('heading', {name: title});
        await expect(this.modalTitle).toBeVisible();
    }

    //Click on the "Next" button to proceed to the next step in the assignment creation process
    async clickNextButton() {
        await this.nextButton.click();
    }

    //Validate the required fields in the "Newsela content source" modal are visible and not empty, and store the assignment name for later use
    async validateContentSourceRequiredFields() {
        await this.validateModalTitle('Newsela content source');
        await expect(this.contentText).toBeVisible();
        await expect(this.addContentButton).toBeVisible();
    }

    //Validate the required fields in the "Assignment Structure" modal are visible and not empty
    async validateAssignmentStructureRequiredFields() {
        await this.validateModalTitle('Assignment Structure');
        await expect(this.assignmentTile).not.toBeNull();
        this.assignmentName = await this.titleAssigment.inputValue() ?? '';
        await expect(this.minWordCount).not.toBeNull();
        await expect(this.maxWordCount).not.toBeNull();
    }

    //Validate the total number of characters in the prompt text area is less than the specified maximum characters
    async validateTotalCharactersInPrompt(maxCharacters: number) {
        const totalCharacters = await this.promptText.textContent();
        expect(totalCharacters?.length ?? 0).toBeLessThan(maxCharacters);
    }

    //Validate the required fields in the "Prompt" modal are visible, not empty, and editable, and validate the total 
    // number of characters in the prompt text area
    async validatePromptRequiredFields() {
        await this.validateModalTitle('Type the prompt your students will respond to:');
        await expect(this.promptText).toBeVisible();
        await expect(this.promptText).not.toBeEmpty();
        await expect(this.promptText).toBeEditable();
        await this.validateTotalCharactersInPrompt(5000);
    }

    //Validate the required fields in the "Assignment Configurations" modal are visible and not empty
    async validateAssignmentConfigurationFields(){
        await this.validateModalTitle('Assignment Configurations');
        await expect(this.rubricOption).toBeVisible();
        await expect(this.rubricOption).not.toBeEmpty();
    }

    //validate the required fields in the "Review Assignment Details" modal are visible, not empty, 
    // and match the previously stored assignment name
    async validateReviewAssignmentDetails(){
        await this.validateModalTitle('Review assignment details');
        await expect(this.reviewAssignmentName).toBeVisible();
        const assignmentTitleReview = await this.reviewAssignmentName.inputValue() ?? '';
        await expect(this.assignmentName).toContain(assignmentTitleReview);
        await expect(this.reviewPromptText).toBeVisible();
        await expect(this.reviewPromptText).not.toBeEmpty();
        await expect(this.reviewConfig).toBeVisible();
        await expect(this.reviewConfig).not.toBeEmpty();
    }

    async saveAssignment(){
        await this.saveAssignmentButton.click();
    }

    //Validate the confirmation message after saving the assignment, ensuring that the confirmation title, message, 
    // and link text are visible, and store the link text value for later use
    async validateConfirmationMessage(){
        await expect(this.confirmationTitle).toBeVisible();
        await expect(this.confirmationMessage).toBeVisible();
        await expect(this.linkText).toBeVisible();
        this.linkTextValue = await this.linkText.inputValue() ?? '';
    }

}