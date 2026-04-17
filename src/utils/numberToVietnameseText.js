function parseVietnameseNumber(str) {
    if (typeof str === "number") return str;
    return Number(str.replace(/\./g, ""));
}

function numberToVietnameseText(number) {
    if (!number) return "";

    number = parseVietnameseNumber(number);
    const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

    function readThreeDigits(num) {
        let hundred = Math.floor(num / 100);
        let ten = Math.floor((num % 100) / 10);
        let unit = num % 10;
        let result = "";

        if (hundred > 0) {
            result += units[hundred] + " trăm";
            if (ten === 0 && unit > 0) result += " linh";
        }

        if (ten > 1) {
            result += " " + units[ten] + " mươi";
            if (unit === 1) result += " mốt";
            else if (unit === 5) result += " lăm";
            else if (unit > 0) result += " " + units[unit];
        } else if (ten === 1) {
            result += " mười";
            if (unit === 5) result += " lăm";
            else if (unit > 0) result += " " + units[unit];
        } else if (ten === 0 && unit > 0) {
            result += " " + units[unit];
        }

        return result.trim();
    }

    const scales = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

    let result = "";
    let i = 0;

    while (number > 0) {
        let chunk = number % 1000;
        if (chunk > 0) {
            let chunkText = readThreeDigits(chunk);
            result = chunkText + " " + scales[i] + " " + result;
        }
        number = Math.floor(number / 1000);
        i++;
    }

    result = result.trim().replace(/\s+/g, " ");
    return result.charAt(0).toUpperCase() + result.slice(1) + " VNĐ";
}

export default numberToVietnameseText;
