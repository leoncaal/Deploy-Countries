import {
  GETALLCOUNTRIES,
  GETCOUNTRYDETAIL,
  GETCOUNTRYBYNAME,
  GETACTIVITIES,
  CLEANCOUNTRYSEARCH,
  CLEANCOUNTRYDETAIL,
  ORDER,
  FILTER, 
  //FILTERBYDIF, 
  RESETFILTERS,
  CURRENTPAGE
} from "./actions.types";
const InitialState = {
  countries: [],
  allcountries: [],
  countryDetail: {},
  activities: [],
  filteredContinents: [],
  filteredActivities: [],
  filterMix: false,
  currentPage: 0
};

const reducer = (state = InitialState, action) => {

  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allcountries: action.payload
      };
    case GETCOUNTRYDETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case GETCOUNTRYBYNAME:
        return {
          ...state,
          countries: action.payload,
          allcountries: action.payload,
        };
    case GETACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      }
    case ORDER:
      if (action.payload === 'Ascendente' || action.payload === 'Descendente'){
        const orderName = [...state.countries].sort((a, b) => {
          if (a.name > b.name) {
            return "Ascendente" === action.payload ? 1 : -1;
          }
          if (a.name < b.name) {
            return "Descendente" === action.payload ? 1 : -1;
          }
          return 0;
        });
  
        return {
          ...state,
          countries: orderName,
        }
      }
        const orderPopulation = [...state.countries].sort((a, b) => {
          if (a.population > b.population) {
            return "Min" === action.payload ? 1 : -1;
          }
          if (a.population < b.population) {
            return "Max" === action.payload ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          countries: orderPopulation,
        }
    case FILTER:
      let mixFilter = [];
      if (action.payload ==="Africa" || action.payload ==="Antarctica" || action.payload ==="Asia" || action.payload ==="Europe" || action.payload ==="North America" || action.payload ==="Oceania" || action.payload ==="South America"){
        const filterContinent = [...state.allcountries].filter(country => country.continent === action.payload);

        state.filteredContinents = filterContinent;

        if(state.filteredContinents.length !== 0 && state.filteredActivities.length !== 0){
          mixFilter = state.filteredActivities.filter(country => country.continent === action.payload);
          if (mixFilter.length === 0){
            return {
              ...state,
              countries: mixFilter,
              filterMix: true
            }
          } else {
            return {
              ...state,
              countries: mixFilter,
              filterMix: false
            }
          }

        }

      } else {
        const filterActivities = [...state.allcountries].filter(act =>{
          let opt = act.activities.some(({name}) => name === action.payload);
          return opt;
        });

        state.filteredActivities = filterActivities;

        if (state.filteredContinents.length !== 0 && state.filteredActivities.length !== 0){
          mixFilter = state.filteredContinents.filter(act => {
          let opt = act.activities.some(({name}) => name === action.payload);
          return opt;
        });
        if (mixFilter.length === 0){
          return {
            ...state,
            countries: mixFilter,
            filterMix: true
          }
        } else {
          return {
            ...state,
            countries: mixFilter,
            filterMix: false
          }
        }
        
        }
      }

      if(state.filteredContinents.length !== 0 && state.filteredActivities.length === 0){
        return {
          ...state,
          countries: state.filteredContinents
        }
      }
      if(state.filteredContinents.length === 0 && state.filteredActivities.length !== 0){
        return {
          ...state,
          countries: state.filteredActivities
        }
      }
      return{
        ...state
      }
      
/*     case FILTERBYDIF:
      const countryWithActiv = [...state.allcountries].filter(act => act.activities.length > 0);
      const filterDif = countryWithActiv.filter(coun => {
        let opt = coun.activities.some(dif => dif.difficulty === action.payload);
        return opt;
      });
      console.log(filterDif);
      return {
        ...state,
        countries: filterDif
      } */

    case RESETFILTERS:
      return {
        ...state,
        countries : [...state.allcountries],
        filteredContinents: [],
        filteredActivities: [],
        filterMix: false

      }

    case CLEANCOUNTRYDETAIL:
      return {
        ...state,
        countryDetail: {},
      };

    case CLEANCOUNTRYSEARCH:
      return {
        ...state,
        countries: [],
      };
    case CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload
      }

    default:
      return {
        ...state,
      };
  }
};
export default reducer;
