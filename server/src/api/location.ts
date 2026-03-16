import type { Express } from 'express'
import { Country, State, City } from 'country-state-city'

export const LocationAPI = (app: Express) => {
    app.get('/api/location/countries', async (req, res) => {
        return res.json(
            Country.getAllCountries().map((country) => {
                return {
                    code: country.isoCode,
                    name: country.name
                }
            }))
    })

    app.get('/api/location/countries/:country/states', async (req, res) => {
        return res.json(
            State.getStatesOfCountry(req.params.country)?.map((state) => {
                return {
                    code: state.isoCode,
                    name: state.name
                }
            })
        );
    })

    app.get('/api/location/countries/:country/states/:state/cities', async (req, res) => {

        let cities = City.getCitiesOfState(req.params.country, req.params.state)

        if (!cities || cities.length == 0)
            cities as any = City.getCitiesOfCountry(req.params.country);

        console.log(cities)

        return res.json(cities?.map((city) => {
            return {
                code: city.name,
                name: city.name
            }
        }))
    })

    app.get('/api/location/countries/:country/cities', async (req, res) => {
        return res.json(
            City.getCitiesOfCountry(req.params.country)?.map((city) => {
                return {
                    code: city.name,
                    name: city.name
                }
            })
        );
    })
}
