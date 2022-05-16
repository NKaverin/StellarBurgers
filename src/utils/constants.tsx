export const api = 'https://norma.nomoreparties.space/api/';

export function checkResponse(res : Promise<[status : string, ok: boolean]>) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject('Ошибка ' + res.status);
}

export const fotmatDate = (date : text) => {
    const currentDate = new Date(date)    
    const options:Intl.DateTimeFormatOptions = {weekday: 'long'};
    const day = currentDate.toLocaleString("ru", options);
    const GMTdifference = -currentDate.getTimezoneOffset()/60;
    const GMTsign = GMTdifference > 0 ? '+' : '-';
    const optionsTime:Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };
    const time = currentDate.toLocaleString("ru", optionsTime);
    
    if (new Date().getDay() === currentDate.getDay()) {
        return `сегодня, ${time} i-GMT${GMTsign}${GMTdifference}`;
    }
    return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${time} i-GMT${GMTsign}${GMTdifference}`;
}

export const getStatusText = (status : text) => {

    switch (status) {

        case 'done': {
            return 'Выполнен';
        }
        case 'pending': {
            return 'Готовится';
        }
        case 'created': {
            return 'Создан';
        }
        default: {
            return 'Отменен';
        }

    }
}

