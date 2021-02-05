import * as React from "react";
import * as moment from "moment";
import { titleShow } from "../../tools/tools";
import timeIco from "../../asserts/timeright.svg";
import { GetDepartInfo } from "../../tools/api";
import { numValue3, numSub2 } from "../../tools/tools";


const { useMemo, memo, useState, useRef, useEffect } = React;

const colorItems = [
    "#5b8ff9",
    "#68E3E2",
    "#F7B500",
    "#FF4500",
    "#9932CC",
    "#DC143C",
];

function DetailInfo(props) {
    const { tableType, bookSort, changeChart } = props;

    const domRef = useRef();
    const [spreaded, setSpreaded] = useState(false);
    const [fieldsArray, setFieldsArray] = useState([]);
    const [departs, setDeparts] = useState([]);
    const [selectedDepart, setSelectedDepart] = useState(null);
    const [time, setTime] = useState(
        moment().subtract(1, "days").format("YYYY-MM-DD")
    );

    useEffect(() => {
        const data = {
            tableType,
            bookSort,
            time,
        };
        GetDepartInfo(data).then((res) => {
            if (res.code && Number(res.code) === 200) {
                setFieldsArray(res.data.fields);
                setDeparts(res.data.departInfo);
                setSelectedDepart(res.data.departInfo[0]);
                changeChart({
                    depart: res.data.departInfo[0].field,
                    departName: res.data.departInfo[0].name,
                });
            }
        });
    }, [tableType, bookSort, time]);

    const boxStyle = useMemo(() => {
        if (bookSort == "book") {
            return "detailBox2";
        }
        if (bookSort == "newspace") {
            return "detailBox3";
        }
        return "detailBox1";
    }, [bookSort]);

    const explorHeight = useMemo(() => {
        if (!!spreaded) {
            let height = window
                .getComputedStyle(domRef.current)
                .getPropertyValue("height");
            return height;
        }
        return "0px";
    }, [spreaded]);

    const showState = useMemo(() => {
        return !!spreaded;
    }, [spreaded]);

    const selectTime = () => {};

    const changeSpread = () => {
        setSpreaded(!spreaded);
    };

    const changeDepart = (item) => {
        setSelectedDepart(item);
        changeChart({ depart: item.field, departName: item.name });
    };

    const renderFields = () => {
        if (!fieldsArray.length) {
            return (
                <div className="flex tipBox">
                    <div className="tipCircle"></div>
                    <div>加载中</div>
                </div>
            );
        }
        return fieldsArray.map((item, index) => {
            return (
                <div className="flex tipBox" key={index}>
                    <div
                        className="tipCircle"
                        style={{
                            backgroundColor: colorItems[index],
                        }}
                    ></div>
                    <div>{item.name}</div>
                </div>
            );
        });
    };

    const renderDeparts = () => {
        if (!departs.length) {
            return (
                <div className="departBoxOuter2">
                    <div className="line"></div>
                    <div className="loadingBox">加载中</div>
                </div>
            );
        }
        return departs.map((item) => {
            return (
                <div
                    className={`departBoxOuter${
                        selectedDepart === item ? "1" : "2"
                    }`}
                    key={item.field}
                    onClick={() => changeDepart(item)}
                >
                    <div className="line"></div>
                    <div className="departBox">
                        <div className="departTitle">{item.name}</div>

                        <div className="flex itemsBox">
                            {item.fieldValue.map((item, index) => {
                                return (
                                    <div
                                        className="flex itemBoxA"
                                        key={item.type}
                                    >
                                        <div
                                            className="fieldCircle"
                                            style={{
                                                backgroundColor:
                                                    colorItems[index],
                                            }}
                                        ></div>
                                        <div className="fieldValue">
                                            {numSub2(item.value)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderFeatureData = () => {
        if (!selectedDepart) {
            return (
                <div className="infoBox">
                    <div className="infoTitle">加载中</div>
                </div>
            );
        }
        return selectedDepart.featureData.map((item, index) => {
            return (
                <div className="infoBox" key={index}>
                    <div className="infoTitle">{item.name}</div>
                    <div className="infoCount">{numValue3(item.value)}</div>
                </div>
            );
        });
    };

    return (
        <div>
            <div className={boxStyle}>
                <div className="title">{titleShow(tableType)}统计</div>

                <div className="titleAndTime">
                    <div className="stockType">
                        {selectedDepart ? selectedDepart.name : "加载中"}
                    </div>
                    <div className="timeShow" onClick={() => selectTime()}>
                        <div className="time">{time}</div>
                        <img src={timeIco} className="timeIco" />
                    </div>
                </div>

                <div className="flex-space infoBoxOuter">
                    {renderFeatureData()}
                </div>
            </div>

            <div className="statisticalBox" style={{ height: explorHeight }}>
                <div ref={domRef}>
                    <div className="line"></div>
                    <div className="flex tipsBox">{renderFields()}</div>
                    {renderDeparts()}
                </div>
            </div>

            <div className="buttonShow" onClick={() => changeSpread()}>
                <div className="line"></div>
                <div className="flex buttonBox">
                    <div className="show">
                        {showState ? "收起" : "全部"}
                        <img
                            src={timeIco}
                            className={showState ? "buttonImg2" : "buttonImg1"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DetailInfo);
