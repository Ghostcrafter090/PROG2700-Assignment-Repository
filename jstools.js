// JSTOOLS, JavaScript Port of GSWeather&More's Python Library 'pytools'. Copy this script in (or what functions you need) to use it.
function reverseString(string) {
    let i = 0;
    let newString = "";
    while (i < string.length) {
        newString = newString + string[string.length - (i + 1)];
        i = i + 1;
    }
    return newString
}

// Old
function replaceCharAtX(string, char, x) {
    let i = 0;
    let newString = "";
    while (i < string.length) {
        if (i == x) {
            newString = newString + char;
        } else {
            newString = newString + string[i];
        }
        i = i + 1;
    }
    return newString;
}

// New
function replaceStrX(string, char, x) {
  return string.substr(0, x) + char + string.substr(x + 1, string.length)
}

function findForwardPatterns(list) {
    let i = 0;
    let n;
    let l = -1;
    let newList = [];
    let f = 0;
    while (i < list.length) {
        f = f + 1;
        if ((n + f) != list[i]) {
            l = l + 1;
            n = list[i];
            newList.push([n]);
            f = 0
        } else {
            newList[l].push(n + f)
        }
        i = i + 1;
    }
    return newList;
}

function sum(list) {
    let i = 0;
    let sum = 0;
    while (i < list.length) {
        sum = sum + list[i]
        i = i + 1;
    }
    return sum;
}

function listInLists(list, func) {
    let newList = [];
    let i = 0;
    while (i < list.length) {
        newList.push(func(list[i]))
        i = i + 1;
    }
    return newList
}

function max(list) {
    let i = 0;
    let max = list[i];
    while (i < list.length) {
        if (max < list[i]) {
            max = list[i];
        }
        i = i + 1;
    }
    return max;
}

function getAnniversary(utc, years) {
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
    return [weeks, days, hours, minutes, seconds]
}

function listFactor(list, val) {
    let i = 0
    let out = false;
    while (i < list.length) {
        if ((val % list[i]) == 0) {
            out = true;
            val = val + 1;
        }
        if (list[i] > (val / 2)) {
            i = list.length;
        }
        i = i + 1;
    }
    return val;
}

function strIncludes(str, substrf) {
  let i = 0;
  let out = false;
  while (i < str.length) {
    if (str.substr(i, substrf.length) === substrf) {
      out = true;
    }
    i = i + 1;
  }
  return out;
}

function isPrime(n) {
    let i = 2
    let f = i;
    let out = true;
    let primeArray = [];
    while (i <= (n / 2)) {
        if ((n % i) == 0) {
            out = false;
            i = n;
        } else {
            f = listFactor(primeArray, i);
            if (f != i) {
                i = f;
            } else {
                primeArray.push(f);
            }
        }
        console.log(i);
        i = i + 1;
    }
    return [out, primeArray];
}
// JsTools, a JavaScript port of PyTools, by Joshua Jones.