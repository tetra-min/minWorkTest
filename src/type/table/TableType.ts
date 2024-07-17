import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type timeRecordType = Array<{
    date: number;
    day: string;
    scheduleArriveWorkTime: string | null | "";
    scheduleLeavingWorkTime: string | null | "";
    schedulePredictionWorkingTime: string | null | "";
    actualArriveWorkTime: string | null | "";
    actualLeavingWorkTime: string | null | "";
    actualBreaktime: string | null | "";
    actualWorkingTime: string | null | "";
    nightWorkingTime: string | null | "";
    paidLeaveApplydate: string | null | "";
    paidLeaveApplyHour: string | null | "";
    AnyApplicationKind: string | null | "";
    approval: string | null | "";
    overtimeWorkingTime: string | null | "";
}>;

export type mainTableHeaderType = Array<
    Array<{
        header: string;
        rowSpan?: number;
        colSpan?: number;
        className?: string;
        width?: string;
    }>
>;

export type providerDataType = {
    selectYear: number;
    selectMonth: number;
    setSelectYear: Dispatch<SetStateAction<number>>;
    setSelectMonth: Dispatch<SetStateAction<number>>;
    setTimeRecord: Dispatch<SetStateAction<timeRecordType>>;
    // selectYear: MutableRefObject<Dropdown>;
    // selectMonth: MutableRefObject<Dropdown>;
    fixedArriveTime: MutableRefObject<string>;
    fixedLeavingTime: MutableRefObject<string>;
    fixedlunchTime: MutableRefObject<string>;
};
