import axios from 'axios';
import {getTokenFromStorage} from '~/storage/auth';

const api = axios.create({
  baseURL: 'https://api-sister.yellowsistemas.com.br/',
});

export async function fetchUserData() {
  const token = await getTokenFromStorage();
  const {data} = await api.get('/driver', {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return data;
}

export async function startRoute(vehicleId, prefectureId, latStart, lngStart) {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append('vehicle-id', vehicleId);
  formData.append('prefecture-id', prefectureId);
  formData.append('lat_start', latStart);
  formData.append('lng_start', lngStart);

  const headers = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const {data} = await api.post('/driver/open-jobs', formData, {headers});
  return data;
}

export default api;
