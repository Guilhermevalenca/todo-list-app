import { api } from 'boot/axios.ts';

export default async function queryGraphQL(query: string) {
  query = query.replace(/\s+/g, '');
  return api.get('graphql?query=' + query).then((response) => {
    response.data = response.data.data;
    return response;
  });
}
