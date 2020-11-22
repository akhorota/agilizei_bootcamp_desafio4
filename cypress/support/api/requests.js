class Requests {

    getPing(){
        return cy.request({
            method: 'GET',
            url: '/ping'
        })
    }

    getBooking(bookingId){
        return cy.request({
            method: 'GET',
            url: `/booking/${bookingId}`
        })
    }

    postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds){
        return cy.request({
            method: 'POST',
            url: '/booking',
            body: {
                "firstname" : firstname,
                "lastname" : lastname,
                "totalprice" : totalprice,
                "depositpaid" : depositpaid,
                "bookingdates" : {
                    "checkin" : checkin,
                    "checkout" : checkout
                },
                "additionalneeds" : additionalneeds
            }
        })
    }

    putBookingWithoutToken(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds, response){

        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            body: {
                "firstname" : firstname,
                "lastname" : lastname,
                "totalprice" : totalprice,
                "depositpaid" : depositpaid,
                "bookingdates" : {
                    "checkin" : checkin,
                    "checkout" : checkout
                },
                "additionalneeds" : additionalneeds
            },
            failOnStatusCode: false
        })
    }

    putBookingWithInvalidToken(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds, response){

        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            headers: {
                Cookie: `invalidToken${Cypress.env('token')}`
            },
            body: {
                "firstname" : firstname,
                "lastname" : lastname,
                "totalprice" : totalprice,
                "depositpaid" : depositpaid,
                "bookingdates" : {
                    "checkin" : checkin,
                    "checkout" : checkout
                },
                "additionalneeds" : additionalneeds
            },
            failOnStatusCode: false
        })
    }

    putInexistentBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds, response){

        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `/booking/${id}999999`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname" : firstname,
                "lastname" : lastname,
                "totalprice" : totalprice,
                "depositpaid" : depositpaid,
                "bookingdates" : {
                    "checkin" : checkin,
                    "checkout" : checkout
                },
                "additionalneeds" : additionalneeds
            },
            failOnStatusCode: false
        })
    }

    postAuthorization(){

        return cy.request({
            method: 'POST',
            url: '/auth',
            body: {
                "username" : "admin",
                "password" : "password123"
            },
        })
    }

    authorize(){

        this.postAuthorization().then(authResponse => {
            const token =  authResponse.body.token;

            Cypress.env('token', token)
        })
    }

    putBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds, responseBooking){

        const id = responseBooking.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname" : firstname,
                "lastname" : lastname,
                "totalprice" : totalprice,
                "depositpaid" : depositpaid,
                "bookingdates" : {
                    "checkin" : checkin,
                    "checkout" : checkout
                },
                "additionalneeds" : additionalneeds
            },
            failOnStatusCode: false
        })
    }

    deleteBooking(responseBooking){

        const id = responseBooking.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWithoutToken(response){

        const id = response.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `/booking/${id}`,
            failOnStatusCode: false
        })
    }

    deleteBookingWithInvalidToken(response){

        const id = response.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `/booking/${id}`,
            headers: {
                Cookie: `invalidToken${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    deleteInexistentBooking(response){

        const id = response.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `/booking/${id}999999`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }
}

export default new Requests();