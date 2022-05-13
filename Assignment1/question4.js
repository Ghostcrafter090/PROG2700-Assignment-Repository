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
        i = i + 1;
    }
    return out;
}

isPrime(5);
isPrime(127);
isPrime(20);
isPrime(3723822);