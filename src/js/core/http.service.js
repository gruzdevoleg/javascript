//класс Http отправляет запросы и возвращает промис
export class Http {
    post(url, data, options) {
        return new Promise((resolve, reject) => {
            //вместо чистого Ajax (new XMLHttpRequest, open, send...)
            //используем fetch
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json())// или JSON.parse(response)
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    get(url, token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                 method: 'GET',
                 headers: {
                     'Content-type': 'application/json',
                     'x-access-token': token
                 }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }
}