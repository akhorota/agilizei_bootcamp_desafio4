/// <reference types="cypress" />

import req from '../support/api/requests'
import assert from '../support/api/assertions'
import schemas from '../support/api/schemas'

context('Booking', () => {

    before(() => {
        req.authorize();
    });

    it('Validar contrato do GET Booking @schema', () => {

        var bookingId = 21;

        req.getBooking(bookingId).then(getBookingResponse => {

            assert.validateSchemaOf(getBookingResponse, schemas.getBookingSchema());
        
        });
    });

    it('Validar contrato do POST Booking @schema', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var totalprice = 200
        var depositpaid = true
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse=> {

            assert.validateSchemaOf(postBookingResponse, schemas.postBookingSchema());
        
        });
    });

    it('Criar reserva com sucesso @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var totalprice = 200
        var depositpaid = true
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            assert.shouldHaveStatus(postBookingResponse, 200);
            assert.bookingIdExists(postBookingResponse.body);
            assert.validatePostBookingHeaders(postBookingResponse.headers);
            assert.validatePostBookingContentType(postBookingResponse.headers);
            assert.validatePostBookingResponseTime(postBookingResponse.duration);

        })
    });

    it('Alterar reserva com sucesso @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var lastname2 = "BootcampDesafio4"
        var totalprice = 200
        var depositpaid = true
        var depositpaid2 = false
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.putBooking(firstname, lastname2, totalprice, depositpaid2, checkin, checkout, additionalneeds, postBookingResponse).then(putBookingResponse => {

                assert.shouldHaveStatus(putBookingResponse, 200);
            
            })
        })
    });

    it('Tentar alterar reserva sem token de autorização @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var lastname2 = "BootcampDesafio4"
        var totalprice = 200
        var depositpaid = true
        var depositpaid2 = false
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.putBookingWithoutToken(firstname, lastname2, totalprice, depositpaid2, checkin, checkout, additionalneeds, postBookingResponse).then(putBookingResponse => {

                assert.shouldHaveStatus(putBookingResponse, 403);
                assert.validateForbiddenMessage(putBookingResponse);
    
            })
        })
    });

    it('Tentar alterar reserva com token de autorização inválido @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var lastname2 = "BootcampDesafio4"
        var totalprice = 200
        var depositpaid = true
        var depositpaid2 = false
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.putBookingWithInvalidToken(firstname, lastname2, totalprice, depositpaid2, checkin, checkout, additionalneeds, postBookingResponse).then(putBookingResponse => {

                assert.shouldHaveStatus(putBookingResponse, 403);
                assert.validateForbiddenMessage(putBookingResponse);

            })
        })
    });

    it('Tentar alterar reserva inexistente @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var lastname2 = "BootcampDesafio4"
        var totalprice = 200
        var depositpaid = true
        var depositpaid2 = false
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.putInexistentBooking(firstname, lastname2, totalprice, depositpaid2, checkin, checkout, additionalneeds, postBookingResponse).then(putBookingResponse => {

                assert.shouldHaveStatus(putBookingResponse, 405);
                assert.validateMethodNotAllowed(putBookingResponse);
            })
        })
    });

    it('Remover reserva com sucesso @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var totalprice = 200
        var depositpaid = true
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {

                assert.shouldHaveStatus(deleteBookingResponse, 201);
                assert.validateDeleteWasSucessfull(deleteBookingResponse);
            
            })
        })
    });

    it('Tentar remover reserva sem token de autorização @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var totalprice = 200
        var depositpaid = true
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {

                assert.shouldHaveStatus(deleteBookingResponse, 403);
                assert.validateForbiddenMessage(deleteBookingResponse);

            })
        })
    });

    it('Tentar remover reserva com token de autorização inválido @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var totalprice = 200
        var depositpaid = true
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.deleteBookingWithInvalidToken(postBookingResponse).then(deleteBookingResponse => {

                assert.shouldHaveStatus(deleteBookingResponse, 403);
                assert.validateForbiddenMessage(deleteBookingResponse);

            })
        })
    });

    it('Tentar alterar reserva inexistente @functional', () => {

        var firstname = "Agilizei"
        var lastname = "Bootcamp"
        var totalprice = 200
        var depositpaid = true
        var checkin = "2020-11-29"
        var checkout = "2020-11-30"
        var additionalneeds = "Free Wifi"

        req.postBooking(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds).then(postBookingResponse => {

            req.deleteInexistentBooking(postBookingResponse).then(deleteBookingResponse => {

                assert.shouldHaveStatus(deleteBookingResponse, 405);
                assert.validateMethodNotAllowed(deleteBookingResponse);
    
            })
        })
    });



});

