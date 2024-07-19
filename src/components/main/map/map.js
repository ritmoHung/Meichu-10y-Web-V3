export function Screen({ className, mirror = false }) {
    return (
        <div className={`${className} grid auto-rows-min content-center gap-4 p-4`}>
            <span className={`${mirror ? "justify-self-end" : "justify-self-start"} px-4`}>250 吋投影布幕</span>
            <div className={`h-4  border-[0.125rem] border-map rounded-md ${mirror ? "rotate-[15deg]" : "-rotate-[15deg]"}`}></div>
        </div>
    );
}

export function Area({ className, label, size = "md", textsize = "", square = false }) {
    return (
        <div className={`${className} grid content-center justify-items-center p-2  border-[0.125rem] border-map ${square ? "aspect-square" : ""}
                         ${size === "sm" ? "rounded-md" : "rounded-2xl"} ${size === "lg" && "text-4xl"} ${size === "md" && "text-2xl"}`}>
            <span className={`${textsize && textsize === "sm" ? "text-microprint" : ""} font-bold text-center whitespace-pre-line`}>{label}</span>
        </div>
    );
}

export function TableRow({ className, amount = 5, distribution, label, mirror = false }) {
    const defaultDistr = Array(amount).fill(1);
    const defaultLabel = Array(amount).fill("");
    const effectiveDistr = distribution || defaultDistr;
    const effectiveLabel = label || defaultLabel;

    const tableUnits = [];
    for (let i = 0; i < amount; i++) {
        tableUnits.push(
            <TableUnit key={i} className={`${effectiveDistr[i] ? "" : "opacity-0"}`} label={effectiveLabel[i]} mirror={mirror} />
        );
    }

    return (
        <div className={`${className} map-table-row`}>
            {tableUnits}
        </div>  
    );
}
export function TableCol({ className, amount = 5, distribution = [1, 1, 1, 1, 1], label, mirror = false }) {
    const defaultDistr = Array(amount).fill(1);
    const defaultLabel = Array(amount).fill("");
    const effectiveDistr = distribution || defaultDistr;
    const effectiveLabel = label || defaultLabel;

    const tableUnits = [];
    for (let i = 0; i < amount; i++) {
        tableUnits.push(
            <TableUnit key={i} className={`${effectiveDistr[i] ? "" : "opacity-0"}`} label={effectiveLabel[i]} mirror={mirror} />
        );
    }

    return (
        <div className={`${className} map-table-col`}>
            {tableUnits}
        </div>  
    );
}

function TableUnit({ className, label, mirror = false }) {
    return (
        <div className="relative flex justify-center">
            {label && <span className="absolute -top-4 text-fineprint select-none">{label}</span>}
            <div className={`${className} relative grid grid-flow-col w-min h-min gap-1 p-2`}>
                <div className="grid auto-rows-min gap-1">
                    <Seat />
                    <Seat empty={mirror} />
                    <Seat />
                </div>
                <Table />
                <div className="grid auto-rows-min gap-1">
                    <Seat />
                    <Seat empty={!mirror} />
                    <Seat />
                </div>
            </div>
        </div>
    );
}

function Table() {
    return (
        <div className="flex">
            <div className="w-[0.9rem] h-full  border-[0.125rem] border-e-0 border-map rounded-s-md"></div>
            <div className="w-4 h-full  border-[0.125rem] border-map rounded-e-md"></div>
        </div>
    ); 
}

function Seat({ empty = false }) {
    return <div className={`map-seat w-4 aspect-square ${empty ? "" : " border-[0.125rem] border-map"} rounded-md`}></div>;
}