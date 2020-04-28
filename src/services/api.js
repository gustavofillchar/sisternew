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

export async function scannerStudentQRCode(
  workedRouteId,
  studentCode,
  latitude,
  longitude,
  readAt,
) {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append('worked_route_id', workedRouteId);
  formData.append('code', studentCode);
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('read_at', readAt);

  const headers = {
    Authorization: `bearer ${token}`,
  };

  const {data} = await api.post('/driver/read-pupil', formData, {headers});
  return data;
}

export async function startRoute(vehicleId, prefectureId, latStart, lngStart) {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append('vehicle_id', vehicleId);
  formData.append('prefecture_id', prefectureId);
  formData.append('lat_start', latStart);
  formData.append('lng_start', lngStart);

  const headers = {
    Authorization: `bearer ${token}`,
  };

  const {data} = await api.post('/driver/open-jobs', formData, {headers});
  return data;
}

export async function closeRoute(
  workedRouteId,
  definedRouteId,
  latEnd,
  lonEnd,
  kms,
  endAt,
) {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append('worked_route_id', workedRouteId);
  formData.append('defined_route_id', definedRouteId);
  formData.append('lat_end', latEnd);
  formData.append('lng_end', lonEnd);
  formData.append('kms', kms);
  formData.append('end_at', endAt);

  const headers = {
    Authorization: `bearer ${token}`,
  };

  const {data} = await api.post('/driver/jobs', formData, {headers});
  return data;
}

export async function streamingRoute() {}

export default api;
