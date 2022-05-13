const list = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3];

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

console.log(max(listInLists(findForwardPatterns(list), sum)));