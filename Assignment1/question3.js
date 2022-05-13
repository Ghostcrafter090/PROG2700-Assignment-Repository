const date = new Date();
const myBirthday = new Date(2002, 7, 14, 8, 0, 0, 0);

let anniversary;
let between;
let final;
let currentStamp = date.getTime();
let birthdayStamp = myBirthday.getTime();

function getAnniversary(utc, years) {
    const oneYear = 31557600000;
    let timeOfYear = utc - (Math.floor(utc / oneYear) * oneYear);
    let anniversary = timeOfYear + (oneYear * years);
    if (anniversary < utc) {
        anniversary = anniversary + oneYear;
    }
    return anniversary;
}

function utcToImperial(utc) {
    weeks = Math.floor(utc / 604800000);
    utc = utc - (weeks * 604800000);
    days = Math.floor(utc / 86400000);
    utc = utc - (days * 86400000);
    hours = Math.floor(utc / 3600000);
    utc = utc - (hours * 3600000);
    minutes = Math.floor(utc / 60000);
    utc = utc - (minutes * 60000);
    seconds = Math.floor(utc / 1000);
    return [weeks, days, hours, minutes, seconds];
}

anniversary = new Date(getAnniversary(birthdayStamp, (date.getFullYear() - 1970)));

between = anniversary.getTime() - date.getTime();

final = utcToImperial(between)

console.log("There are " + final[0] + " weeks, " + final[1] + " days, " + final[2] + " hours, " + final[3] + " minutes, and " + final[4] + " seconds until my next birthday!");