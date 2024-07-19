// Components & UI
import { Screen, Area, TableRow, TableCol } from "@/components/main/map/map";



export default function Map({ params }) {
    return (
        <div id="map" className="grid auto-rows-min [&_>_*]:justify-self-center gap-row scale-75">
            {(params.year === "2023") ? (
                <Map2023 />
            ) : (
                <span className="text-2xl font-bold">還沒有畫好 ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡</span>
            )}
        </div>
    );
}

function Map2023({ className }) {
    return (
        <>
            <div id="map-stage" className={`${className} grid grid-cols-[1fr_2fr_1fr] w-full gap-8 aspect-3/1`}>
                <Screen />
                <div className="grid grid-rows-[2fr_1fr] gap-8">
                    <div className="grid grid-cols-[1fr_4fr_1fr] gap-8">
                        <div className="self-end grid content-center justify-items-center aspect-2/3"></div>
                        <div className="grid grid-rows-[auto_1fr] content-center justify-items-center gap-2">
                            <span className="font-bold">背板</span>
                            <Area className="w-full" label="主舞台" />
                        </div>
                        <Area className="self-end aspect-2/3" label="控台" size="sm" />
                    </div>
                    <Area label="貴賓席" />
                </div>
                <Screen mirror />
            </div>
            <div id="map-seats" className="grid grid-flow-col grid-cols-auto w-max">
                <div className="grid gap-row me-8">
                    <TableRow className="bg-nxp" amount={5} label={["1", "2", "3", "4", "5"]} />
                    <TableRow className="bg-kk" amount={5} label={["1", "2", "3", "4", "5"]} />
                    <TableRow className="bg-google" amount={5} label={["1", "2", "3", "4", "5"]} />
                    <TableRow className="bg-tsmc" amount={5} label={["1", "2", "3", "4", "5"]} />
                    <TableRow className="bg-ettoday" amount={5} label={["1", "2", "3", "4", "5"]} />
                </div>
                <div className="grid gap-row me-2">
                    <TableRow className="bg-nxp" amount={3} label={["6", "7", "8"]} mirror />
                    <TableRow className="bg-kk" amount={3} label={["6", "7", "8"]} mirror />
                    <TableRow className="bg-google" amount={3} label={["6", "7", "8"]} mirror />
                    <TableRow className="bg-tsmc" amount={3} label={["6", "7", "8"]} mirror />
                    <TableRow className="bg-ettoday" amount={3} label={["6", "7", "8"]} mirror />
                    
                </div>
                <div className="flex gap-2">
                    <TableCol className="bg-maker" amount={5} label={["1", "3", "5", "7", "9"]} mirror />
                    <TableCol className="bg-maker" amount={5} label={["2", "4", "6", "8", "10"]} mirror />
                </div>
            </div>
            <div id="map-seats-extra" className="flex gap-aisle">
                <TableRow className="bg-line" amount={4} label={["1", "2", "3", "4"]} />
                <TableRow className="bg-line" amount={4} label={["5", "6", "7", "8"]} mirror />
            </div>
            <div id="map-bottom" className="grid grid-cols-[1.25fr_1fr] w-full mt-8 gap-aisle">
                <Area label="休憩區" size="lg" />
                <div className="grid grid-cols-4 aspect-square gap-2">
                    <Area label={`ETtoday\n新聞雲`} size="sm" square />
                    <Area label="台灣水泥" size="sm" square />
                    <div></div>
                    <Area label="服務台" size="sm" square />

                    <Area label="曉數碼" size="sm" square />
                    <Area label="Google" size="sm" square />
                    <div></div>
                    <Area label="NXP" size="sm" square />

                    <Area label="tsmc" size="sm" square />
                    <Area label="國泰金控" size="sm" square />
                    <div></div>
                    <Area label="ITSA" size="sm" square />

                    <Area label="美光" size="sm" square />
                    <Area label="KKCompany" size="sm" textsize="sm" square />
                    <div></div>
                    <Area label="ITSA" size="sm" square />

                    <Area label="LINE" size="sm" square />
                    <Area label="抽獎區" size="sm" square />
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
}