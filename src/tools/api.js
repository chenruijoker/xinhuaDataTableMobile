import axios from "axios";

function Request(method = "get", url, data = null) {
    return new Promise((resolve, reject) => {
        axios({
            baseURL: "http://172.30.145.128:8800/",
            method: method,
            url,
            timeout: 10000,
            data,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((res) => {
                reject();
            });
    });
}

export function GetHomePageInfo() {
    return Request("get", "getHomePageInfo");
}

export function GetDepartInfo(data) {
    return Request("post", "getDepartInfo", data);
}

export function GetChartsData(data) {
    return Request("post", "getCharts", data);
}
