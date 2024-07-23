import { useContext } from "react";
import Context from "@/components/Context";
import mainStyle from "@/styles/table/main.module.css";
import { DataTable } from "primereact/datatable";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { rangeArray } from "@/Utils";
// import { tableCellKeyName } from "@/utils/table/Utils";
import type { providerDataType } from "@/type/table/TableType";

function View() {
    const data = useContext(Context) as providerDataType;

    const {
        selectYear,
        selectMonth,
        setSelectYear,
        setSelectMonth,
        // setTimeRecord,
        fixedArriveTime,
        fixedLeavingTime,
        fixedlunchTime,
        // totalSchedulePredictionWorkingTime,
        // totalActualWorkingTime,
        // totalNightWorkingTime,
        // totalPaidLeaveApplydate,
        // totalPaidLeaveApplyHour,
        calcData,
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
                                className={mainStyle["dropdownBox"]}
                                panelClassName={mainStyle["dropDownPanel"]}
                            ></Dropdown>
                            <span>年</span>
                            <Dropdown
                                value={selectMonth}
                                options={selectMonthOption}
                                optionLabel="name"
                                onChange={selectMonthChange}
                                className={mainStyle["dropdownBox"]}
                                panelClassName={mainStyle["dropDownPanel"]}
                            ></Dropdown>
                            <span>月</span>
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
                                    totalSchedulePredictionWorkingTime: "予働計(h)",
                                    totalActualWorkingTime: "実働計(h)",
                                    totalNightWorkingTime: "深夜実績実働(h)",
                                    totalPaidLeaveApplydate: "日有給申請",
                                    totalPaidLeaveApplyHour: "時間有給申請",
                                },
                                {
                                    totalSchedulePredictionWorkingTime: calcData.totalSchedulePredictionWorkingTime,
                                    totalActualWorkingTime: calcData.totalActualWorkingTime,
                                    totalNightWorkingTime: calcData.totalNightWorkingTime,
                                    totalPaidLeaveApplydate: calcData.totalPaidLeaveApplydate,
                                    totalPaidLeaveApplyHour: calcData.totalPaidLeaveApplyHour,
                                },
                            ]}
                        >
                            <Column bodyClassName={mainStyle["BodyCell"]} field="totalSchedulePredictionWorkingTime" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="totalActualWorkingTime" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="totalNightWorkingTime" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="totalPaidLeaveApplydate" />
                            <Column bodyClassName={mainStyle["BodyCell"]} field="totalPaidLeaveApplyHour" />
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
