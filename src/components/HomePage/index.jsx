import * as React from "react";
import "./index.scss";
import avatar from "../../asserts/avatar.png";
import Card from "./Card";
import PayImg from "../../asserts/pay.svg";
import Stock from "../../asserts/stock.svg";
import Sale from "../../asserts/sale.svg";
import UnPay from "../../asserts/unpay.svg";

const list = [
    { name: "付款报表", Icon: PayImg, route: "pay" },
    { name: "未付款报表", Icon: UnPay, route: "unpay" },
    { name: "库存报表", Icon: Stock, route: "stock" },
    { name: "销售报表", Icon: Sale, route: "sale" },
];

function HomePage(props) {
    return (
        <div>
            <div className="hometop">
                <div className="topbox">
                    <img src={avatar} className="avatar" />
                </div>
                <div className="topbox">
                    <div className="title">首页</div>
                </div>
                <div className="topbox"></div>
            </div>

            <div className="banner">
                <div className="desc">
                    <div className="descOne">报表统计情况</div>
                    <div className="descTwo">各部门一年内的销售数据</div>
                </div>
            </div>

            <div className="cardOuter">
                {list.map((item, index) => {
                    return (
                        <Card key={index} Icon={item.Icon} name={item.name} route={item.route}/>
                    );
                })}
            </div>
        </div>
    );
}

export default HomePage;
