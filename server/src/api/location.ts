import { Country, State, City } from 'country-state-city'

export const LocationAPI = (app) => {
    app.get('/api/location/countries', async (req, res) => {
        return res.json(
            Country.getAllCountries().map((country) => {
                return { code: country.isoCode, name: country.name }
            }))
    })

    app.get('/api/location/countries/:code/cities', async (req, res) => {
        const states = State.getStatesOfCountry(req.params.code)

        return res.json(
            City.getCitiesOfCountry(req.params.code)?.map((city) => {
                return {
                    code: city.name,
                    name: city.name
                }
            })
        );
    })
}
