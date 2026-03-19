import type { Request, Response } from 'express'
import { Country, State, City } from 'country-state-city'

export const GetLocCountries = async (req: Request, res: Response) => {
    return res.json(
        Country.getAllCountries().map((country) => {
            return {
                code: country.isoCode,
                name: country.name
            }
        }))
}

export const GetCountryStates = async (req: Request, res: Response) => {
    return res.json(
        State.getStatesOfCountry(req.params.country)?.map((state) => {
            return {
                code: state.isoCode,
                name: state.name
            }
        })
    );
}

export const GetStateCities = async (req: Request, res: Response) => {
    let cities = City.getCitiesOfState(req.params.country, req.params.state)

    if (!cities || cities.length == 0)
        cities as any = City.getCitiesOfCountry(req.params.country);

    return res.json(cities?.map((city) => {
        return {
            code: city.name,
            name: city.name
        }
    }))
}

export const GetCountryCities = async (req: Request, res: Response) => {
    return res.json(
        City.getCitiesOfCountry(req.params.country)?.map((city) => {
            return {
                code: city.name,
                name: city.name
            }
        })
    );
}
