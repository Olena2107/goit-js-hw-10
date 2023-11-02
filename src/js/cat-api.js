const API_URL = 'https://api.thecatapi.com/v1';
import axios from "axios";

axios.defaults.headers.common ['x-api-key'] =
  'live_l7x88Vd7CXB91WLq2YtcKRI4dyEBrFSALX0GgFQktuLXUOkoh5iK7i0R75xdjsOn';


export function fetchBreeds() {
  return axios
    .get(`${API_URL}/breeds`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(errorMessage);
      }
      return response.data;
    }); 
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${API_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(errorMessage);
      }
      return response.data;
    });
}