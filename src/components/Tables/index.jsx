import * as React from "react";
import "./index.scss";
import { useParams, useHistory } from "react-router-dom";
import { titleShow, numValue2 } from "../../tools/tools";
import leftImg from "../../asserts/right.svg";
import bookIco from "../../asserts/book.svg";
import newSpaceIco from "../../asserts/newspace.svg";
import onlineRetailerIco from "../../asserts/onlineRetailer.svg";
import textbookIco from "../../asserts/textbook.svg";
import unbookIco from "../../asserts/unbook.svg";
import DetailInfo from "./DetailInfo";
import Charts from "./Charts";
import busi from "../../asserts/busi.svg";
import teb from "../../asserts/teb.svg";
import boo from "../../asserts/boo.svg";
import unb from "../../asserts/unb.svg";
import nsp from "../../asserts/nsp.svg";
import { context } from "../../redux";

const selectItems = [
    { desc: "图书", name: "book", ico: bookIco, selectIco: boo },
    { desc: "非图", name: "unbook", ico: unbookIco, selectIco: unb },
    { desc: "教材", name: "textbook", ico: textbookIco, selectIco: teb },
    {
        desc: "电商",
        name: "onlineRetailer",
        ico: onlineRetailerIco,
        selectIco: busi,
    },
    { desc: "新空间", name: "newspace", ico: newSpaceIco, selectIco: nsp },
];

// alert(navigator.userAgent);

const { useState, useEffect, useContext, useMemo } = React;

function Tables(props) {
    const { id } = useParams();
    const history = useHistory();
    let [state] = useContext(context);

    const [activeItem, setActiveItem] = useState("book");
    const [departId, setDepartId] = useState(null);
    const [departName, setDepartName] = useState("加载中");

    const sumCount = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        const type = id === "sale" ? "B" : "A";
        return numValue2(state.homePageData[id].count, type);
    }, [state]);

    const totalPrice = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        const type = id === "sale" ? "B" : "A";
        return numValue2(state.homePageData[id].totalPrice, type);
    }, [state]);

    const discountPrice = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        const type = id === "sale" ? "B" : "A";
        return numValue2(state.homePageData[id].discountPrice, type);
    }, [state]);

    const cost = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        return numValue2(1234567828880, "B");
    }, [state]);

    const backToHome = () => {
        history.push("/");
    };
    const changeItem = (name) => {
        setActiveItem(name);
    };

    const changeChart = (data) => {
        const { depart, departName } = data;
        setDepartName(departName);
        setDepartId(depart);
    };

    return (
        <div className="tablePage">
            <div className="tableHead">
                <div className="tableTitleBox">
                    <div className="titlebox">
                        <img
                            className="leftImg"
                            src={leftImg}
                            onClick={backToHome}
                        />
                    </div>
                    <div className="titlebox">
                        <div className="title">{titleShow(id)}</div>
                    </div>
                    <div className="titlebox"></div>
                </div>

                <div className="tableAbstract">
                    <div className="abstractVal">
                        <div>总数量</div>
                        <div
                            className={`numval ${
                                id === "sale" ? "numval2" : "numval1"
                            }`}
                        >
                            {sumCount}
                        </div>
                    </div>
                    <div className="abstractVal">
                        <div>码洋</div>
                        <div
                            className={`numval ${
                                id === "sale" ? "numval2" : "numval1"
                            }`}
                        >
                            {totalPrice}
                        </div>
                    </div>
                    <div className="abstractVal">
                        <div>实洋</div>
                        <div
                            className={`numval ${
                                id === "sale" ? "numval2" : "numval1"
                            }`}
                        >
                            {discountPrice}
                        </div>
                    </div>
                    {id === "sale" && (
                        <div className="abstractVal">
                            <div>成本</div>
                            <div className="numval numval2">{cost}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="contentBox">
                <div className="icoBox">
                    {selectItems.map((item, index) => {
                        return (
                            <div
                                onClick={() => changeItem(item.name)}
                                className={
                                    item.name == activeItem
                                        ? "icoItem2"
                                        : "icoItem1"
                                }
                                key={index}
                            >
                                <div className="itemCon">
                                    <img
                                        src={
                                            item.name == activeItem
                                                ? item.selectIco
                                                : item.ico
                                        }
                                        className="icoImg1"
                                    />
                                    <div>{item.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <DetailInfo
                    bookSort={activeItem}
                    tableType={id}
                    changeChart={changeChart}
                />
                <Charts
                    bookSort={activeItem}
                    tableType={id}
                    depart={departId}
                    departName={departName}
                />
            </div>
        </div>
    );
}

export default Tables;
