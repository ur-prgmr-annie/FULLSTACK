/* =========================================
   FULLSTACK SEMINAR 2026
   REGISTRATION JAVASCRIPT
========================================= */


/* =========================================
   GOOGLE APPS SCRIPT WEB APP URL
========================================= */

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzuZ8eU5eYh55AQQns95SivKXYglHGfWXUV0dvVnC_xF-eZ-gdNhtMyUjPrAyufwLhK/exec";


/* =========================================
   GLOBAL VARIABLES
========================================= */

let currentStep = 1;
let selectedYear = "";
let selectedSection = "";


/* =========================================
   GET FORM ELEMENTS
========================================= */

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const privacyCheckbox =
    document.getElementById("privacy");


/* =========================================
   NEXT STEP
========================================= */

function nextStep() {

    if (currentStep === 1) {

        if (!validateStepOne()) {
            return;
        }

    }

    if (currentStep === 2) {

        if (!validateStepTwo()) {
            return;
        }

    }

    currentStep++;

    updateStep();
}


/* =========================================
   PREVIOUS STEP
========================================= */

function previousStep() {

    if (currentStep > 1) {

        currentStep--;

        updateStep();

    }
}


/* =========================================
   UPDATE STEP
========================================= */

function updateStep() {

    document
        .querySelectorAll(".form-step")
        .forEach(step => {

            step.classList.remove("active");

        });


    const activeStep =
        document.getElementById(
            `step${currentStep}`
        );


    if (activeStep) {

        activeStep.classList.add("active");

    }


    const progress =
        document.getElementById("progress");

    const stepText =
        document.getElementById("stepText");


    if (currentStep === 1) {

        progress.style.width = "33.33%";

        stepText.textContent =
            "Step 1 of 3";

    }


    if (currentStep === 2) {

        progress.style.width = "66.66%";

        stepText.textContent =
            "Step 2 of 3";

    }


    if (currentStep === 3) {

        progress.style.width = "100%";

        stepText.textContent =
            "Step 3 of 3";

        updateSummary();

    }


    document
        .querySelector(".registration-container")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


/* =========================================
   STEP 1 VALIDATION
========================================= */

function validateStepOne() {

    let valid = true;


    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");


    nameError.textContent = "";

    emailError.textContent = "";


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();


    /* NAME */

    if (name === "") {

        nameError.textContent =
            "Please enter your full name.";

        nameInput.focus();

        valid = false;

    }


    /* EMAIL */

    if (email === "") {

        emailError.textContent =
            "Please enter your email address.";

        if (valid) {

            emailInput.focus();

        }

        valid = false;

    }

    else if (!isValidEmail(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        if (valid) {

            emailInput.focus();

        }

        valid = false;

    }


    return valid;
}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


/* =========================================
   SELECT YEAR
========================================= */

function selectYear(button, year) {

    document
        .querySelectorAll(
            "#step2 .option"
        )
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    button.classList.add("selected");

    selectedYear = year;


    document.getElementById(
        "yearError"
    ).textContent = "";
}


/* =========================================
   SELECT SECTION
========================================= */

function selectSection(button, section) {

    document
        .querySelectorAll(
            ".section-options .option"
        )
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    button.classList.add("selected");

    selectedSection = section;


    document.getElementById(
        "sectionError"
    ).textContent = "";
}


/* =========================================
   STEP 2 VALIDATION
========================================= */

function validateStepTwo() {

    let valid = true;


    const yearError =
        document.getElementById("yearError");

    const sectionError =
        document.getElementById("sectionError");


    yearError.textContent = "";

    sectionError.textContent = "";


    if (selectedYear === "") {

        yearError.textContent =
            "Please select your year level.";

        valid = false;

    }


    if (selectedSection === "") {

        sectionError.textContent =
            "Please select your section.";

        valid = false;

    }


    return valid;
}


/* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary() {

    document.getElementById(
        "summaryName"
    ).textContent =
        nameInput.value.trim();


    document.getElementById(
        "summaryEmail"
    ).textContent =
        emailInput.value.trim();


    document.getElementById(
        "summaryYear"
    ).textContent =
        selectedYear;


    document.getElementById(
        "summarySection"
    ).textContent =
        selectedSection;
}


/* =========================================
   SUBMIT REGISTRATION
========================================= */

function submitRegistration() {

    const privacyError =
        document.getElementById(
            "privacyError"
        );

    const submitButton =
        document.querySelector(
            "#step3 .primary-button"
        );


    /* Clear previous error */

    privacyError.textContent = "";


    /* Check privacy consent */

    if (!privacyCheckbox.checked) {

        privacyError.textContent =
            "Please agree to the Data Privacy Consent before submitting.";

        return;

    }


    /* Prevent double submission */

    submitButton.disabled = true;

    submitButton.textContent =
        "Submitting...";


    /*
        =====================================
        CREATE HIDDEN IFRAME
        =====================================
    */

    let iframe =
        document.getElementById(
            "googleFormTarget"
        );


    if (!iframe) {

        iframe =
            document.createElement("iframe");

        iframe.id =
            "googleFormTarget";

        iframe.name =
            "googleFormTarget";

        iframe.style.display =
            "none";

        document.body.appendChild(
            iframe
        );

    }


    /*
        =====================================
        CREATE HIDDEN FORM
        =====================================
    */

    const form =
        document.createElement("form");


    form.method = "POST";

    form.action =
        SCRIPT_URL;

    form.target =
        "googleFormTarget";

    form.style.display =
        "none";


    /*
        =====================================
        HELPER FUNCTION
        =====================================
    */

    function addField(name, value) {

        const input =
            document.createElement("input");

        input.type = "hidden";

        input.name = name;

        input.value = value;

        form.appendChild(input);

    }


    /*
        =====================================
        ADD REGISTRATION DATA
        =====================================
    */

    addField(
        "name",
        nameInput.value.trim()
    );

    addField(
        "email",
        emailInput.value.trim()
    );

    addField(
        "year",
        selectedYear
    );

    addField(
        "section",
        selectedSection
    );

    addField(
        "privacy",
        "Agreed"
    );


    /*
        =====================================
        SUBMIT TO GOOGLE APPS SCRIPT
        =====================================
    */

    document.body.appendChild(form);

    form.submit();


    /*
        =====================================
        SHOW SUCCESS SCREEN
        =====================================
    */

    setTimeout(() => {

        document
            .querySelectorAll(".form-step")
            .forEach(step => {

                step.classList.remove(
                    "active"
                );

            });


        document
            .getElementById("success")
            .classList.add("active");


        const progressArea =
            document.querySelector(
                ".progress-area"
            );


        if (progressArea) {

            progressArea.style.display =
                "none";

        }


        document
            .querySelector(
                ".registration-container"
            )
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


        /*
            Remove temporary form
        */

        setTimeout(() => {

            if (form.parentNode) {

                form.parentNode.removeChild(
                    form
                );

            }

        }, 1000);


    }, 1000);

}


/* =========================================
   REAL-TIME INPUT CLEANUP
========================================= */

nameInput.addEventListener(
    "input",
    function () {

        document.getElementById(
            "nameError"
        ).textContent = "";

    }
);


emailInput.addEventListener(
    "input",
    function () {

        document.getElementById(
            "emailError"
        ).textContent = "";

    }
);


/* =========================================
   PRIVACY CHECKBOX
========================================= */

privacyCheckbox.addEventListener(
    "change",
    function () {

        document.getElementById(
            "privacyError"
        ).textContent = "";

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateStep();