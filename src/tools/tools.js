function numSub(num, paramNum, MathNum = 10000) {
    let floatNum = (num / MathNum).toString().split(".")[1];
    floatNum = !!floatNum ? `.${floatNum.substr(0, paramNum)}` : "";
    let theNum = `${parseInt(num / MathNum)}${floatNum}`;
    return theNum;
}

export function numSub2(val, maxLength = 6) {
    const num = val.toString();
    let IntegeNum = num.split(".")[0];
    let floatNum = !!num.split(".")[1] ? num.split(".")[1] : "";
    if (num.length <= maxLength) {
        return num;
    }
    if (IntegeNum.length === maxLength) {
        return IntegeNum;
    }
    if (IntegeNum.length > maxLength + 5) {
        IntegeNum = parseInt(Number(IntegeNum) / 100000000);
        return `${IntegeNum}亿`;
    }
    if (IntegeNum.length > maxLength + 4) {
        IntegeNum = (Number(IntegeNum) / 100000000).toFixed(1);
        return `${IntegeNum}亿`;
    }
    if (IntegeNum.length > maxLength + 3) {
        IntegeNum = parseInt(Number(IntegeNum) / 10000000);
        return `${IntegeNum}千万`;
    }
    if (IntegeNum.length > maxLength + 2) {
        IntegeNum = parseInt(Number(IntegeNum) / 1000000);
        return `${IntegeNum}百万`;
    }
    if (IntegeNum.length > maxLength) {
        IntegeNum = parseInt(Number(IntegeNum) / 10000);
        return `${IntegeNum}万`;
    }
    if (!!floatNum) {
        let point = 0;
        for (let i = 0; i < floatNum.length; i++) {
            if (IntegeNum.length + floatNum.length - i <= maxLength) {
                point = i;
                break;
            }
        }
        floatNum =
            point === floatNum.length
                ? ""
                : `.${floatNum.substr(0, floatNum.length - point)}`;
        return `${IntegeNum}${floatNum}`;
    }
}

export function numValue(val) {
    const num = Number(val);
    if (num > 9999999999) {
        return `${parseInt(num / 10000)}万`;
    }
    if (num > 999999999) {
        return `${numSub(num, 1)}万`;
    }
    if (num > 99999999) {
        return `${numSub(num, 2)}万`;
    }
    if (num > 9999999) {
        return `${numSub(num, 3)}万`;
    }
    return num;
}

export function numValue3(val) {
    const num = Number(val);
    if (num > 9999999999999) {
        return `${parseInt(num / 1000000000)}百亿`;
    }
    if (num > 999999999999) {
        return `${numSub(num, 1, 100000000)}亿`;
    }
    if (num > 99999999999) {
        return `${numSub(num, 1, 10000000)}千万`;
    }
    if (num > 9999999999) {
        return `${numSub(num, 1, 1000000)}百万`;
    }
    return num;
}

export function numValue2(val, type = "B") {
    const num = Number(val);
    if (type === "A") {
        if (num > 999999999999) {
            const IntegerNum = parseInt(num / 100000000);
            return `${IntegerNum}亿`;
        }
        if (num > 99999999999) {
            const IntegerNum = parseInt(num / 10000000);
            return `${IntegerNum}千万`;
        }
        if (num > 99999999) {
            return `${parseInt(num / 10000)}万`;
        }
        return num;
    }
    if (type === "B") {
        if (num > 99999999999) {
            const IntegerNum = parseInt(num / 100000000);
            return `${IntegerNum}亿`;
        }
        if (num > 9999999999) {
            return `${numSub(num, 1, 100000000)}亿`;
        }
        if (num > 999999999) {
            return `${parseInt(num / 10000000)}千万`;
        }
        if (num > 9999999) {
            return `${parseInt(num / 10000)}万`;
        }
        if (num > 999999) {
            return `${numSub(num, 1)}万`;
        }
        return num;
    }
}

export function titleShow(val) {
    switch (val) {
        case "pay":
            return "付款报表";
        case "unpay":
            return "未付款报表";
        case "stock":
            return "库存报表";
        case "sale":
            return "销售报表";
        default:
            return "入口异常";
    }
}
