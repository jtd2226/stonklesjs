import { Country, State, City } from 'country-state-city';
import fs from 'fs';

export default async function getServerSideProps(_, res) {
  const countries = Country.getAllCountries().reduce((countries, country) => {
    const statesOfCountry = State.getStatesOfCountry(country.isoCode);
    const states = statesOfCountry.reduce((states, state) => {
      states[state.name] = City.getCitiesOfState(country.isoCode, state.isoCode)
        .map(c => c.name)
        .join(';');
      return states;
    }, {});
    const names = statesOfCountry.map(s => s.name).join(';');
    countries[country.name] = { names, states };
    return countries;
  }, {});

  countries.names = Object.keys(countries).join(';');
  fs.writeFileSync('meta/countries.json', JSON.stringify(countries, null, 2));
  return res.status(200).json(countries);
}
