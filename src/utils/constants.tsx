export const api = 'https://norma.nomoreparties.space/api/';

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject('Ошибка ' + res.status);
}

export const fotmatDate = (date) => {
    const currentDate = new Date(date)
    if (new Date().getDay() === currentDate.getDay()) {
        return 'сегодня';
    }
    
    const options = {weekday: 'long'};
    const day = currentDate.toLocaleString("ru", options);
    const GMTdifference = -currentDate.getTimezoneOffset()/60;
    const GMTsign = GMTdifference > 0 ? '+' : '-';
    const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
    };
    const time = currentDate.toLocaleString("ru", optionsTime);
    
    return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${time} i-GMT${GMTsign}${GMTdifference}`;
}

export const getStatusText = (status) => {

    switch (status) {

        case 'done': {
            return 'Выполнен';
        }
        case 'pending': {
            return 'Выполнен';
        }
        case 'created': {
            return 'Выполнен';
        }
        default: {
            return 'Отменен';
        }

    }
}