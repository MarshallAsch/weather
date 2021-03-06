const { expect } = require('chai');
const weather = require('..');

// Tests

describe('weather', () => {
    // find
    describe('find()', () => {
        it('should find a location with weather information', (done) => {
            weather.find({
                search: 'San Francisco, CA', degreeType: 'F',
            }, (err, result) => {
                if (err) return done(err);

                expect(err).to.be.equal(null);

                expect(result).to.be.a('array');
                expect(result).to.have.property('length').to.be.equal(1);
                expect(result[0]).to.be.a('object');

                expect(result[0]).to.have.property('location').to.be.a('object');
                expect(result[0].location).to.have.property('name', 'San Francisco, CA');
                expect(result[0].location).to.have.property('lat', '37.78');
                expect(result[0].location).to.have.property('long', '-122.42');
                expect(result[0].location).to.have.property('timezone').to.be.a('string');
                expect(result[0].location).to.have.property('alert').to.be.a('string');
                expect(result[0].location).to.have.property('degreetype', 'F');
                expect(result[0].location).to.have.property('imagerelativeurl').to.be.a('string');

                expect(result[0]).to.have.property('current').to.be.a('object');
                expect(result[0].current).to.have.property('temperature');
                expect(result[0].current).to.have.property('temperature');
                expect(result[0].current).to.have.property('temperature');
                expect(result[0].current).to.have.property('skycode');
                expect(result[0].current).to.have.property('skytext');
                expect(result[0].current).to.have.property('date');
                expect(result[0].current).to.have.property('observationtime');
                expect(result[0].current).to.have.property('observationpoint');
                expect(result[0].current).to.have.property('feelslike');
                expect(result[0].current).to.have.property('humidity');
                expect(result[0].current).to.have.property('winddisplay');
                expect(result[0].current).to.have.property('day');
                expect(result[0].current).to.have.property('shortday');
                expect(result[0].current).to.have.property('windspeed');
                expect(result[0].current).to.have.property('imageUrl');

                expect(result[0]).to.have.property('forecast').to.be.a('array');
                expect(result[0].forecast).to.have.property('length').to.be.above(0);
                expect(result[0].forecast[0]).to.be.a('object');
                expect(result[0].forecast[0]).to.have.property('low');
                expect(result[0].forecast[0]).to.have.property('high');
                expect(result[0].forecast[0]).to.have.property('skycodeday');
                expect(result[0].forecast[0]).to.have.property('skytextday');
                expect(result[0].forecast[0]).to.have.property('date');
                expect(result[0].forecast[0]).to.have.property('day');
                expect(result[0].forecast[0]).to.have.property('shortday');
                expect(result[0].forecast[0]).to.have.property('precip');

                return done();
            });
        });

        it('should find multiple locations with weather information', (done) => {
            weather.find({
                search: 'Washington', degreeType: 'F', resCount: 2,
            }, (err, result) => {
                if (err) return done(err);

                expect(err).to.be.equal(null);
                expect(result).to.be.a('array');
                expect(result).to.have.property('length').to.be.above(1);
                return done();
            });
        });

        it('should fail to find a location (missing options)', (done) => {
            weather.find(null, (err, result) => {
                if (!err) return done('No error!');

                expect(result).to.be.equal(undefined);
                return done();
            });
        });

        it('should not return any address (bad address)', (done) => {
            weather.find({
                search: '.',
            }, (err, result) => {
                if (err) return done(err);

                expect(err).to.be.equal(null);
                expect(result).to.be.a('array');
                expect(result).to.have.property('length').to.be.equal(0);
                return done();
            });
        });
    });
});
