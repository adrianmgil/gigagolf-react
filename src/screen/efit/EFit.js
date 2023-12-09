import GGNav from "../../component/GGNav";
import { mockEfit } from "../../mocks/efit";
import Header from "../header/Header";
import Club from "./Club";
import ClubDetail from "./ClubDetail";
import './efit.less';

const efit = () => {
    const data = mockEfit;

    return (
        <>
            <GGNav />
            <div className="efit-club">
                <Club groupnum={data.groupnum} />
                <ClubDetail data={data} />
            </div>
        </>
    );
};

export default efit;