// DOM Elements
const authElements = {
    signIn: {
        form: document.querySelector('.form-login'),
        username: document.getElementById('username-log'),
        password: document.getElementById('pass-log'),
        email: document.getElementById('mail-log'),
        submitButton: document.getElementById('btn-log')
    },
    signUp: {
        form: document.querySelector('.form-register'),
        username: document.getElementById('username-reg'),
        password: document.getElementById('pass-reg'),
        email: document.getElementById('mail-reg'),
        submitButton: document.getElementById('btn-reg')
    },
    modal: {
        wrapper: document.querySelector('.wrapper-modal'),
        title: document.getElementById('staticBackdropLabel'),
        toggleButton: document.querySelector('.btn-change')
    }
};

// Constants
const STORAGE_KEY = 'userAccounts';
const MESSAGES = {
    success: {
        signUp: 'Account created successfully',
        signIn: 'Signed in successfully'
    },
    error: {
        signIn: 'Please create an account first',
        emptyFields: 'Please fill in all fields'
    }
};

// Utilities
class FormUtils {
    static clearFields(formType) {
        const form = authElements[formType];
        form.username.value = '';
        form.password.value = '';
        form.email.value = '';
    }

    static validateFields(formType) {
        const form = authElements[formType];
        return form.username.value.trim() !== '' &&
            form.password.value.trim() !== '' &&
            form.email.value.trim() !== '';
    }

    static toggleForms() {
        authElements.signIn.form.classList.toggle('d-none');
        authElements.signUp.form.classList.toggle('d-none');
        authElements.modal.wrapper.innerHTML = '';
    }
}

// Message Display
class MessageDisplay {
    static showMessage(message, isSuccess = true) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.classList.add(
            isSuccess ? 'text-success' : 'text-danger',
            'p-2'
        );
        authElements.modal.wrapper.innerHTML = '';
        authElements.modal.wrapper.appendChild(messageElement);
    }
}

// Auth Manager
class AuthManager {
    static initialize() {
        const accounts = localStorage.getItem(STORAGE_KEY);
        if (!accounts) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
    }

    static getAccounts() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    static createAccount(userData) {
        const accounts = this.getAccounts();
        accounts.push(userData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    }

    static verifyAccount(credentials) {
        const accounts = this.getAccounts();
        return accounts.some(account =>
            account.username === credentials.username &&
            account.password === credentials.password &&
            account.email === credentials.email
        );
    }
}

// Event Handlers
class AuthEventHandler {
    static handleSignUp(event) {
        event?.preventDefault();

        if (!FormUtils.validateFields('signUp')) {
            MessageDisplay.showMessage(MESSAGES.error.emptyFields, false);
            return;
        }

        const userData = {
            username: authElements.signUp.username.value,
            password: authElements.signUp.password.value,
            email: authElements.signUp.email.value
        };

        AuthManager.createAccount(userData);
        MessageDisplay.showMessage(MESSAGES.success.signUp);
        FormUtils.clearFields('signUp');
    }

    static handleSignIn(event) {
        event?.preventDefault();

        const credentials = {
            username: authElements.signIn.username.value,
            password: authElements.signIn.password.value,
            email: authElements.signIn.email.value
        };

        if (AuthManager.verifyAccount(credentials)) {
            MessageDisplay.showMessage(MESSAGES.success.signIn);
        } else {
            MessageDisplay.showMessage(MESSAGES.error.signIn, false);
        }
    }
}

// Initialize
(function initialize() {
    AuthManager.initialize();

    // Event Listeners
    authElements.modal.toggleButton.addEventListener('click', FormUtils.toggleForms);
    authElements.signUp.submitButton.addEventListener('click', AuthEventHandler.handleSignUp);
    authElements.signIn.submitButton.addEventListener('click', AuthEventHandler.handleSignIn);
})();