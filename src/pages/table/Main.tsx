import { useState } from "react";
// import { useRef, useEffect } from "react";
// import jspreadsheet from "jspreadsheet-ce/dist";
// import jspreadsheetBasicStyle from "jspreadsheet-ce/dist/jspreadsheet.css?inline";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import mainStyle from "@/styles/table/main.module.css";

// function App() {
//     const sheetRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         const refDiv = sheetRef.current as HTMLDivElement;

//         if (!refDiv.classList.length) {
//             jsSheet(refDiv);
//         }
//     });

//     return (
//         <>
//             <div ref={sheetRef}></div>
//             <style>{jspreadsheetBasicStyle}</style>
//         </>
//     );
// }

// function jsSheet(targetRef: HTMLDivElement) {
//     return jspreadsheet(targetRef, {
//         data: [
//             ["Mazda", 2001, 2000],
//             ["Pegeout", 2010, 5000],
//         ],
//         columns: [
//             { title: "Model", width: 300 },
//             { title: "Price", width: 80 },
//             { title: "Model", width: 100 },
//         ],
//     });
// }

import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Icon, Table } from "semantic-ui-react";

const App = () => {
    const [sales] = useState([
        { product: "Bamboo Watch", lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342 },
        { product: "Black Watch", lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: "Blue Band", lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: "Blue T-Shirt", lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323 },
        { product: "Brown Purse", lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332 },
        {
            product: "Chakra Bracelet",
            lastYearSale: 52,
            thisYearSale: 65,
            lastYearProfit: 421132,
            thisYearProfit: 150005,
        },
        {
            product: "Galaxy Earrings",
            lastYearSale: 82,
            thisYearSale: 12,
            lastYearProfit: 131211,
            thisYearProfit: 100214,
        },
        {
            product: "Game Controller",
            lastYearSale: 44,
            thisYearSale: 45,
            lastYearProfit: 66442,
            thisYearProfit: 53322,
        },
        { product: "Gaming Set", lastYearSale: 90, thisYearSale: 56, lastYearProfit: 765442, thisYearProfit: 296232 },
        {
            product: "Gold Phone Case",
            lastYearSale: 75,
            thisYearSale: 54,
            lastYearProfit: 21212,
            thisYearProfit: 12533,
        },
    ]);

    const lastYearSaleBodyTemplate = (rowData) => {
        return `${rowData.lastYearSale}%`;
    };

    const thisYearSaleBodyTemplate = (rowData) => {
        return `${rowData.thisYearSale}%`;
    };

    const lastYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.lastYearProfit)}`;
    };

    const thisYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.thisYearProfit)}`;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    const lastYearTotal = () => {
        let total = 0;

        for (let sale of sales) {
            total += sale.lastYearProfit;
        }

        return formatCurrency(total);
    };

    const thisYearTotal = () => {
        let total = 0;

        for (let sale of sales) {
            total += sale.thisYearProfit;
        }

        return formatCurrency(total);
    };

    const headerObj: Array<
        Array<{
            header: string;
            rowSpan?: number;
            colSpan?: number;
        }>
    > = [
        [
            {
                header: "日",
                rowSpan: 2,
            },
            {
                header: "曜日",
                rowSpan: 2,
            },
            {
                header: "予定",
                colSpan: 3,
            },
            {
                header: "実績",
                colSpan: 4,
            },
            {
                header: "深夜実績\n実働(h)",
                rowSpan: 2,
            },
            {
                header: "日有給申請",
                rowSpan: 2,
            },
            {
                header: "時間\n有給申請",
                rowSpan: 2,
            },
            {
                header: "適用",
                rowSpan: 2,
            },
            {
                header: "承認",
                rowSpan: 2,
            },
            {
                header: "overtime",
            },
        ],
        [
            {
                header: "出社",
            },
            {
                header: "退社",
            },
            {
                header: "予働（h）",
            },
            {
                header: "出社",
            },
            {
                header: "退社",
            },
            {
                header: "休憩時間",
            },
            {
                header: "実働（h）",
            },
            {
                header: "実績",
            },
        ],
    ];

    const headerGroup = (
        <ColumnGroup>
            {(() => {
                const result: any = [];

                for (const [headerKey, headers] of headerObj.entries()) {
                    const pushColumn = [];

                    for (const [itemKey, item] of headers.entries()) {
                        pushColumn.push(
                            <Column
                                headerClassName={mainStyle["dataTableCellPadding"]}
                                header={item.header}
                                colSpan={item.colSpan}
                                rowSpan={item.rowSpan}
                                key={`col_${itemKey}`}
                            ></Column>
                        );
                    }

                    result.push(<Row key={`row_${headerKey}`}>{pushColumn}</Row>);
                }

                return result;
            })()}
        </ColumnGroup>
    );

    // const footerGroup = (
    //     <ColumnGroup>
    //         <Row>
    //             <Column footer="Totals:" colSpan={3} footerStyle={{ textAlign: "right" }} />
    //             <Column footer={lastYearTotal} />
    //             <Column footer={thisYearTotal} />
    //         </Row>
    //     </ColumnGroup>
    // );

    return (
        <>
            <main id={mainStyle.main}>
                <div className="card">
                    <DataTable
                        value={sales}
                        headerColumnGroup={headerGroup}
                        tableStyle={{ minWidth: "50rem" }}
                        editMode="cell"
                    >
                        <Column className={mainStyle["dataTableCellPadding"]} field="product" />
                        <Column
                            className={mainStyle["dataTableCellPadding"]}
                            field="lastYearSale"
                            body={lastYearSaleBodyTemplate}
                        />
                        <Column
                            className={mainStyle["dataTableCellPadding"]}
                            field="thisYearSale"
                            body={thisYearSaleBodyTemplate}
                        />
                        <Column
                            className={mainStyle["dataTableCellPadding"]}
                            field="lastYearProfit"
                            body={lastYearProfitBodyTemplate}
                        />
                        <Column
                            className={mainStyle["dataTableCellPadding"]}
                            field="thisYearProfit"
                            body={thisYearProfitBodyTemplate}
                        />
                    </DataTable>
                </div>
            </main>
        </>
    );
};

export default App;
