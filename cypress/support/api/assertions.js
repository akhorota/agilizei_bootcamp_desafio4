class Assertions {

    shouldHaveStatus(response, status){
        expect(response.status, `Status is ${status}`).to.eq(status);
    }

    validateSchemaOf(response, schema){
        return cy.wrap(response.body).should(
            schema
        )
    }

    bookingIdExists(responseBody){
        expect(responseBody.bookingid, 'BookingId exists').to.not.be.null;
    }

    validatePostBookingHeaders(responseHeaders){
        expect(responseHeaders, 'Default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    validatePostBookingContentType(responseHeaders){
        expect(responseHeaders, 'Content-type').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    validatePostBookingResponseTime(responseTime){
        var maxResponseTime = 900
        expect(responseTime, `Response time less than ${maxResponseTime}`).lessThan(900);
    }

    validateDeleteWasSucessfull(response){
        expect(response.body, 'Response message').eq('Created');
    }

    validateMethodNotAllowed(response){
        expect(response.body, 'Response message').eq('Method Not Allowed');
    }

    validateForbiddenMessage(response){
        expect(response.body, 'Response message').eq('Forbidden');
    }

}

export default new Assertions();