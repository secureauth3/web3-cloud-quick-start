const API_PREFIX = '';

export async function fetchUser(account: string, accessToken: string, apiKey: string) {
    const requestOptionsGetUser: any = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken} ${apiKey}`
        },
    };
  
    return new Promise<{ data: any }>((resolve, reject) => {
      fetch(`${API_PREFIX}/api/v1/users/${account}`, requestOptionsGetUser)
      .then(response => response.json())
      .then(data => {
        resolve({ data: data })
      })
      .catch(() => {
        reject({data: null});
      });
    });
}