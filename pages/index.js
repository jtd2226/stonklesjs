import React from 'react';
import { useRouter } from 'next/router';
import Store from 'red-ui/dist/collection/Store';
import { TextInput, AutoComplete } from 'red-react';
import countries from 'meta/countries.json';
// import { Country, State, City } from 'country-state-city';
// import fs from 'fs';

// const countries = { names: '' };

// export async function getServerSideProps() {
//   const countries = Country.getAllCountries().reduce((countries, country) => {
//     const statesOfCountry = State.getStatesOfCountry(country.isoCode);
//     const states = statesOfCountry.reduce((states, state) => {
//       states[state.name] = City.getCitiesOfState(country.isoCode, state.isoCode)
//         .map(c => c.name)
//         .join(';');
//       return states;
//     }, {});
//     const names = statesOfCountry.map(s => s.name).join(';');
//     countries[country.name] = { names, states };
//     return countries;
//   }, {});

//   countries.names = Object.keys(countries).join(';');
//   fs.writeFileSync('meta/countries.json', JSON.stringify(countries, null, 2));
//   return {
//     props: { countries },
//   };
// }

const useForm = Store({ first_name: '', last_name: '' });

function Step1() {
  const [state, setState] = useForm();
  return (
    <>
      <h1>Register</h1>
      <p>
        Registering is everyone's favorite part, so I made an app where you can
        do it over and over again!
      </p>
      <flex-container>
        <TextInput
          label="First Name"
          name="first_name"
          value={state.first_name}
          onInputChange={e =>
            setState({
              ...state,
              first_name: e.detail,
            })
          }
        />
        <TextInput
          label="Last name"
          value={state.last_name}
          onInputChange={e => {
            setState({
              ...state,
              last_name: e.detail,
            });
          }}
        />
      </flex-container>
      <TextInput
        label="Birthday"
        value={state.birthday}
        type="date"
        onInputChange={e => {
          setState({
            ...state,
            birthday: e.detail,
          });
        }}
      />
      <TextInput
        label="Phone Number"
        value={state.phone}
        type="phone"
        onInputChange={e => {
          setState({
            ...state,
            phone: e.detail,
          });
        }}
      />
      <TextInput
        label="name@example.com"
        value={state.email}
        type="email"
        onInputChange={e => {
          setState({
            ...state,
            email: e.detail,
          });
        }}
      />
    </>
  );
}

function Step2() {
  const [state, setState] = useForm();
  const states = countries[state.country];
  const cities = states?.states[state.state];
  return (
    <>
      <h1>Address</h1>
      <AutoComplete
        label="Country"
        selected={state.country}
        options={countries.names}
        onPick={e => {
          setState({
            ...state,
            country: e.detail,
            state: countries[e.detail]?.states?.[state.state]
              ? state.state
              : '',
          });
        }}
      />
      {states?.names?.length ? (
        <AutoComplete
          label="State"
          selected={state.state}
          options={states.names}
          onPick={e => {
            setState({
              ...state,
              state: e.detail,
              city: states?.states[e.detail]?.split(';').includes(state.city)
                ? state.city
                : '',
            });
          }}
        />
      ) : (
        ''
      )}
      {cities?.length ? (
        <AutoComplete
          label="City"
          selected={state.city}
          options={cities}
          onPick={e => {
            setState({
              ...state,
              city: e.detail,
            });
          }}
        />
      ) : (
        ''
      )}
      <TextInput
        label="Street"
        value={state.street}
        onInputChange={e => {
          setState({
            ...state,
            street: e.detail,
          });
        }}
      />
      {state.country === 'United States' && (
        <TextInput
          label="Zip code"
          value={state.zip}
          type="zip"
          onInputChange={e => {
            setState({
              ...state,
              zip: e.detail,
            });
          }}
        />
      )}
    </>
  );
}

function Step3() {
  const [state] = useForm();
  return (
    <>
      <h1>Review Details</h1>
      {Object.entries(state).map(([key, value]) => (
        <div key={key} style={{ textAlign: 'left' }}>
          <strong>
            {key.slice(0, 1).toLocaleUpperCase()}
            {key.slice(1).split('_').join(' ')}
          </strong>
          : {value}
        </div>
      ))}
    </>
  );
}

const steps = [Step1, Step2, Step3];

export default function Page() {
  const {
    query: { step = 0 },
    push,
    back,
  } = useRouter();
  const Step = steps[step] ?? steps[0];

  const backDisabled = !steps[parseInt(step) - 1];
  const shouldSubmit = !steps[parseInt(step) + 1];

  const formRef = React.useRef();

  return (
    <main>
      <form ref={formRef} name="register">
        <Step />
        <flex-container>
          <button disabled={backDisabled} type="button" onClick={() => back()}>
            Back
          </button>
          <button
            type="button"
            onClick={async () => {
              const inputs = formRef.current.querySelectorAll(
                'text-input, auto-complete'
              );
              const validity = await Promise.all(
                Array.from(inputs).map(input => input.validate())
              );
              console.log(validity);
              const valid = validity.reduce(
                (validity, valid) => validity && valid,
                true
              );
              if (!valid) return;
              if (shouldSubmit) {
                push('/');
              } else {
                push(`/?step=${parseInt(step) + 1}`);
              }
            }}
          >
            {shouldSubmit ? 'Submit' : 'Next'}
          </button>
        </flex-container>
      </form>
    </main>
  );
}
