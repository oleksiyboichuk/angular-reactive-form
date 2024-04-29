import {browser, by, element} from "protractor";

describe('FormGroupComponent', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should display a list of users', () => {
    const userList = element.all(by.css('.div-table tbody tr'));
    expect(userList.count()).toBeGreaterThan(0);
  });

  it('should fill out the form and save a new user', () => {
    const nameInput = element(by.id('name'));
    const usernameInput = element(by.id('username'));
    const emailInput = element(by.id('email'));
    const saveButton = element(by.css('.btn-success'));

    nameInput.sendKeys('Test User');
    usernameInput.sendKeys('testuser');
    emailInput.sendKeys('test@example.com');
    saveButton.click();

    // Assuming there's a success message displayed after saving
    expect(element(by.css('.success-message')).isPresent()).toBeTruthy();
  });

  it('should display error messages for invalid inputs', () => {
    const nameInput = element(by.id('name'));
    const usernameInput = element(by.id('username'));
    const emailInput = element(by.id('email'));
    const saveButton = element(by.css('.btn-success'));

    // Attempt to save with empty fields
    saveButton.click();

    // Verify error messages are displayed
    expect(element(by.css('.danger-text')).isPresent()).toBeTruthy();

    // Fill out inputs with invalid values
    nameInput.sendKeys(''); // Invalid, required field
    usernameInput.sendKeys(''); // Invalid, required field
    emailInput.sendKeys('invalidemail'); // Invalid email format
    saveButton.click();

    // Verify error messages are displayed
    expect(element(by.css('.danger-text')).isPresent()).toBeTruthy();
  });

  it('should edit a user', () => {
    // Assuming there's at least one user in the list
    const editButton = element.all(by.css('.primary-button')).first();
    editButton.click();

    const newName = 'Edited User';
    const nameInput = element(by.id('name'));

    nameInput.clear();
    nameInput.sendKeys(newName);

    const saveButton = element(by.css('.btn-success'));
    saveButton.click();

    // Assuming there's a success message displayed after editing
    expect(element(by.css('.success-message')).isPresent()).toBeTruthy();

    // Verify that the user's name is updated
    expect(element(by.cssContainingText('.div-table tbody tr td', newName)).isPresent()).toBeTruthy();
  });
});
