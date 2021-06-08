//process to Create Emails
//you can decied the email length you need and email type "length+.com"

context('Actions', () => {
    beforeEach(() => {
        cy.visit('https://www.instagram.com/')
    })


    const emails = (val) => {

        var email = "";
        var dom = ".com";


        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$12";
        for (var i = 0; i < val; i++) {

            email += possible.charAt(Math.floor(Math.random() * possible.length));


        }
        email += dom;
        return email;

    }


    //validate emails
    //used a general Regex here

    const validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());

    }

    //Test Cases (10 loops and  create 10 test cases)

    for (let index = 0; index < 10; index++) {
        const TestEmail = emails(10) //size of email

        const EmailState = validateEmail(TestEmail)
        it("EmailTest -" + TestEmail + " - " + EmailState, () => {
            cy.get(':nth-child(1) > ._9GP1n > .f0n8F > ._2hvTZ').type(TestEmail)
            cy.get(':nth-child(2) > ._9GP1n > .f0n8F > ._2hvTZ').type("abcd123")

            cy.get('.sqdOP > .Igw0E').click();
            cy.wait(2000)

            if (!EmailState) {
                cy.get('[data-testid=login-error-message]').should('be.visible');
            } else {
                cy.get('[data-testid=login-error-message]').should('not.be.visible');


            }
            cy.screenshot();
        })
    }
})