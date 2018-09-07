import { stringify } from 'qs'
import request from '../utils/request'

/** GET */
export async function queryPosts(params) {
  return request(`/posts?${stringify(params)}`)
}

/* POST parmas__body */
export async function queryAlbums(params) {
  return request(`/albums?${stringify(params)}`)
  // return request.post('/albums', params,false);
}

/* POST parmas_formData */
export async function queryPhotos(params) {
  return request(`/photos?${stringify(params)}`);
}
/*export async function queryPhotos(params) {
    return request.post('/photos', params);
}*/
