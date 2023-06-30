function modifierCalc(val) {
    if (val >= 30) {
        return 10;
    } else if (val >= 28) {
        return 9;
    } else if (val >= 26) {
        return 8;
    } else if (val >= 24) {
        return 7;
    } else if (val >= 22) {
        return 6;
    } else if (val >= 20) {
        return 5;
    } else if (val >= 18) {
        return 4;
    } else if (val >= 16) {
        return 3;
    } else if (val >= 14) {
        return 2;
    } else if (val >= 12) {
        return 1;
    } else if (val >= 10) {
        return 0;
    } else if (val >= 8) {
        return -1;
    } else if (val >= 6) {
        return -2;
    } else if (val >= 4) {
        return -3;
    } else if (val >= 2) {
        return -4;
    } else if (val === 1) {
        return -5;
    } else {
        return null;
    }
}

export default modifierCalc;