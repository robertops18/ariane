import customfetch from "./token-validation";
import { BASE_API } from 'react-native-dotenv';

class Api {

    async login(username, pass) {

        const query = await customfetch(`${BASE_API}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: pass
            })
        });
        return query ? await query.json() : false;

    }
    
    async uploadAvatar(token, data){
        const query = await customfetch(`${BASE_API}/user/update-avatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: data
        }, token);
        console.log(query);
        return query ? await query.json() : false;
    };

    async registerToken(token, data){
        const query = await customfetch(`${BASE_API}/user/register-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                token: data
            })
        });
        return await query.json();
    }

    async getProfile(token) {
        const query = await customfetch(`${BASE_API}/user/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }, token);

        if(query){
            const data = await query.json();
            return data.profile
        } else {
            return false;
        }

    }

    async changePassword({oldPass, newPass, newPassRep}, token) {
        const query = await customfetch(`${BASE_API}/user/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                old_password: oldPass,
                new_password: newPass,
                new_password_r: newPassRep
            })
        }, token);
        return query ? await query.json() : false;

    }

    async passwordRecover(email) {
        const query = await customfetch(`${BASE_API}/user/recovery-password?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return query ? await query.json() : false;

    }

    async getFieldTrips(token) {
      const query = await customfetch(`${BASE_API}/field-activity/student/activities`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      }, token);

      if(query){
        const data = await query.json();
        return data.result;
      } else {
        return false;
      }
    }

    async getFieldTripMarkers(token) {
    const query = await customfetch(`${BASE_API}/field-activity/student/activities/markers`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }, token);

    if(query){
      const data = await query.json();
      return data.result;
    } else {
      return false;
    }
  }

    async submitAnswer(token, answer, taskId) {
      const query = await customfetch(`${BASE_API}/answer/` + taskId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          answer: answer,
        })
      }, token);
      return query ? await query.json() : false;
    }

    async saveLog(token, action, taskId) {
      const query = await customfetch(`${BASE_API}/log/` + taskId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          action: action.action,
          lat: action.lat,
          lng: action.lng
        })
      }, token);
      return query ? await query.json() : false;
    }
}

export default new Api();
