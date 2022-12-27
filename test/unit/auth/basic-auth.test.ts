import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Auth from '../../../src/Auth';
import ZoomInfoException from '../../../src/helpers/Exception/ZoomInfoException';

const mock = new MockAdapter(axios);

describe('Basic Auth - Integration Test', () => {
  test('should fetch user access token', async () => {
    const data = {
      jwt: 'accessTokenString',
    };
    mock.onPost('https://api.zoominfo.com/authenticate').reply(200, data);
    await Auth.getBasicAuthToken('username', 'password').then((res: any) =>
      expect(res).toEqual(data.jwt),
    );
  });

  test('should throw credentials error', async () => {
    const data = { error: 'Invalid credentials' };
    mock.onPost('https://api.zoominfo.com/authenticate').reply(401, data);
    await expect(Auth.getBasicAuthToken('username', 'password')).rejects.toThrow(ZoomInfoException);
  });
});
