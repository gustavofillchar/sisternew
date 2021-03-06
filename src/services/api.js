import axios from 'axios';
import {getTokenFromStorage} from '~/storage/auth';
import md5 from 'md5';
import {getNowDateFormmated} from '~/utils/date';

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

export async function startRoute(
  code,

  latStart,
  lngStart,
) {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append('code', code);
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
  console.log(workedRouteId, definedRouteId, latEnd, lonEnd, kms, endAt);

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

export async function streamingRoute(workedRouteId, coords) {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append('worked_route_id', workedRouteId);
  formData.append('latitude', coords.latitude);
  formData.append('longitude', coords.longitude);
  formData.append('created_at_gps', getNowDateFormmated());

  const headers = {
    Authorization: `bearer ${token}`,
  };

  await api.post('/driver/streaming', formData, {headers});
}

export default api;
