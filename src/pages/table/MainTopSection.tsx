import { useContext } from "react";
import Context from "@/components/Context";
import mainStyle from "@/styles/table/main.module.css";
import { DataTable } from "primereact/datatable";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { rangeArray } from "@/Utils";
// import { getTimeRecord } from "@/utils/table/Utils";
import type { providerDataType } from "@/type/table/TableType";

function View() {
    const data = useContext(Context) as providerDataType;

    const {
        selectYear,
        selectMonth,
        setSelectYear,
        setSelectMonth,
        setTimeRecord,
        fixedArriveTime,
        fixedLeavingTime,
        fixedlunchTime,
    } = data;

    const selectYearOption = rangeArray(2009, 2024).map((v) => {
        return { name: v, value: v };
    });

    const selectMonthOption = rangeArray(1, 12).map((v) => {
        return { name: v, value: v };
    });

    return (
        <>
            <section className={mainStyle["mainTopSection"]}>
                <div className={`${mainStyle["mainTopInner"]}`}>
                    <div className={mainStyle["inputArea"]}>
                        <div>
                            <Dropdown
                                value={selectYear}
                                options={selectYearOption}
                                optionLabel="name"
                                onChange={selectYearChange}
                            ></Dropdown>
                            年
                            <Dropdown
                                value={selectMonth}
                                options={selectMonthOption}
                                optionLabel="name"
                                onChange={selectMonthChange}
                            ></Dropdown>
                            月
                        </div>
                    </div>
                    <div className={mainStyle["timeDisplayArea"]}>
                        <DataTable
                            headerColumnGroup={
                                <ColumnGroup>
                                    <Row>
                                        <Column
                                            headerClassName={mainStyle["boxHeader"]}
                                            alignHeader="center"
                                            header={"定時"}
                                            colSpan={3}
                                        ></Column>
                                    </Row>
                                </ColumnGroup>
                            }
                            className={mainStyle["fixedRecordTimeBox"]}
                            value={[
                                {
                                    fixedArriveTime: "出社",
                                    fixedLeavingTime: "退社",
                                    fixedlunchTime: "休憩時間",
                                },
                                {
                                    fixedArriveTime: fixedArriveTime.current,
                                    fixedLeavingTime: fixedLeavingTime.current,
                                    fixedlunchTime: fixedlunchTime.current,
                                },
                            ]}
                        >
                            <Column bodyClassName={mainStyle["BodyCell"]} field="fixedArriveTime" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="fixedLeavingTime" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="fixedlunchTime" />
                        </DataTable>

                        <DataTable
                            headerColumnGroup={
                                <ColumnGroup>
                                    <Row>
                                        <Column
                                            headerClassName={mainStyle["boxHeader"]}
                                            alignHeader="center"
                                            header={"総計"}
                                            colSpan={5}
                                        ></Column>
                                    </Row>
                                </ColumnGroup>
                            }
                            className={mainStyle["totalDisplayBox"]}
                            value={[
                                {
                                    a: "予働計(h)",
                                    b: "実働計(h)",
                                    c: "深夜実績実働(h)",
                                    d: "日有給申請",
                                    e: "時間有給申請",
                                },
                                {
                                    a: "a",
                                    b: "b",
                                    c: "c",
                                    d: "d",
                                    e: "e",
                                },
                            ]}
                        >
                            <Column bodyClassName={mainStyle["BodyCell"]} field="a" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="b" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="c" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="d" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="e" />
                        </DataTable>
                    </div>
                </div>
            </section>
        </>
    );

    function selectYearChange(e: DropdownChangeEvent) {
        const changeYear = e.value;

        setSelectYear(changeYear);

        // const record = getTimeRecord(
        //     changeYear,
        //     selectMonth,
        //     fixedArriveTime.current,
        //     fixedLeavingTime.current,
        //     fixedlunchTime.current
        // );

        // setTimeRecord(record);
    }

    function selectMonthChange(e: DropdownChangeEvent) {
        const changeMonth = e.value;

        setSelectMonth(changeMonth);

        // const record = getTimeRecord(
        //     selectYear,
        //     changeMonth,
        //     fixedArriveTime.current,
        //     fixedLeavingTime.current,
        //     fixedlunchTime.current
        // );

        // setTimeRecord(record);
    }
}

export default View;
