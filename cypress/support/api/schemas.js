import spok from 'cy-spok'

class Schemas {

    getBookingSchema(){
        return spok({
            firstname: spok.string,
            lastname: spok.string,
            totalprice: spok.number,
            depositpaid: spok.type('boolean'),
            bookingdates: {
                checkin: spok.string,
                checkout: spok.string
            },
            additionalneeds: spok.string
        })
    };

    postBookingSchema(){
        return spok({
            bookingid: spok.number,
            booking: {
                firstname: spok.string,
                lastname: spok.string,
                totalprice: spok.number,
                depositpaid: spok.type('boolean'),
                bookingdates: {
                    checkin: spok.string,
                    checkout: spok.string
                },
                additionalneeds: spok.string
            }    
        })
    };

}

export default new Schemas();