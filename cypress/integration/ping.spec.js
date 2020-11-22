/// <reference types="cypress" />

import req from '../support/api/requests'
import assert from '../support/api/assertions'

context('Ping', () => {
    it('GET Healthcheck @healthcheck', () => {
        
        req.getPing().then(getPingResponse => {
            assert.shouldHaveStatus(getPingResponse, 201)
        });

    });
});