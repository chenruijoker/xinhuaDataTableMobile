import * as React from "react";
import rightArrow from "../../asserts/right.svg";
import { numValue } from "../../tools/tools";
import { useHistory } from "react-router-dom";
import { context } from "../../redux/index";

const { useContext, useMemo } = React;

function Card(props) {
    const { Icon, name, route } = props;
    const history = useHistory();
    let [state] = useContext(context);

    const sumCount = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        return numValue(state.homePageData[route].count);
    }, [state]);

    const totalPrice = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        return numValue(state.homePageData[route].totalPrice);
    }, [state]);

    const discountPrice = useMemo(() => {
        if (!state.homePageData) {
            return "加载中";
        }
        return numValue(state.homePageData[route].discountPrice);
    }, [state]);

    const leapTable = () => {
        history.push(`/tables/${route}`);
    };

    return (
        <div className="card" onClick={leapTable}>
            <div className="cardInside">
                <div className="cardBox1">
                    <span className="cardTitle">{name}</span>
                    <img src={rightArrow} className="rightArrow" />
                </div>
                <div className="imgIcoBox">
                    <img src={Icon} className="Ico" />
                </div>

                <div className="cardValues va">
                    <div className="tips">
                        <div className="circleA"></div>
                        <div className="tipA">总数量</div>
                    </div>
                    <div className="numA">{sumCount}</div>
                </div>

                <div className="cardValues vb">
                    <div className="tips">
                        <div className="circleB"></div>
                        <div className="tipB">码洋</div>
                    </div>
                    <div className="numB">{totalPrice}</div>
                </div>
                <div className="cardValues vb">
                    <div className="tips">
                        <div className="circleB"></div>
                        <div className="tipB">实洋</div>
                    </div>
                    <div className="numB">{discountPrice}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;
