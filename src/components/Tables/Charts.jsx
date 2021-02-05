import * as React from "react";
import * as moment from "moment";
import F2 from "@antv/f2";
import { GetChartsData } from "../../tools/api";

const colorItems = [
    "#5b8ff9",
    "#68E3E2",
    "#F7B500",
    "#FF4500",
    "#9932CC",
    "#DC143C",
];
const areaColorItems = [
    "l(90) 0:#5b8ff9 1:#FFFFFF",
    "l(90) 0:#68E3E2 1:#FFFFFF",
    "l(90) 0:#F7B500 1:#FFFFFF",
    "l(90) 0:#FF4500 1:#FFFFFF",
    "l(90) 0:#9932CC 1:#FFFFFF",
    "l(90) 0:#DC143C 1:#FFFFFF",
];

const { useState, useEffect } = React;

function Charts(props) {
    const { bookSort, tableType, depart, departName } = props;

    const [year, setYear] = useState(moment().format("YYYY"));

    useEffect(() => {
        const data = { bookSort, tableType, depart };
        if (!depart) {
            return;
        }
        GetChartsData(data).then((res) => {
            if (res.code && Number(res.code) === 200) {
                initDraw(res.data);
            }
        });
    }, [bookSort, tableType, depart]);

    const initDraw = (data) => {
        const chart = new F2.Chart({
            id: "container",
            pixelRatio: window.devicePixelRatio,
        });
        chart.source(data);
        chart.landscape(true);
        chart.scale("date", {
            range: [0, 1],
            tickCount: 6,
        });
        chart.scale("value", {
            tickCount: 6,
        });
        chart.axis("date", {
            label: function label(text, index, total) {
                // 只显示每一年的第一天
                const textCfg = {
                    fill: "#ccc",
                };
                if (index === 0) {
                    textCfg.textAlign = "left";
                } else if (index === total - 1) {
                    textCfg.textAlign = "right";
                }
                return textCfg;
            },
        });

        chart.axis("value", {
            label: {
                fill: "#cccccc",
            },
        });

        chart.legend({
            nameStyle: {
                fill: "#808080",
                textAlign: "start",
            },

            marker: {
                symbol: "square",
                radius: 5,
            },
        });

        chart
            .line()
            .position("date*value")
            .color("type", colorItems)
            .size("type", [1]);
        chart.area().position("date*value").color("type", areaColorItems);

        chart.render();
    };

    return (
        <div className="chartBox">
            <div className="picFont">
                <div className="flex-space">
                    <div className="chartDesc">最新一个月的趋势</div>
                    <div className="yearShow">{year}年度</div>
                </div>
                <div className="departTitle">{departName}</div>

                <div className="F2Chart">
                    <canvas id="container"></canvas>
                </div>
            </div>
        </div>
    );
}

export default Charts;
