import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type timeRecordType = {
    date: string | number;
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
};

// export type timeRecordType = Array<{
//     1: number;
//     2: string;
//     3: string | null | "";
//     4: string | null | "";
//     5: string | null | "";
//     6: string | null | "";
//     7: string | null | "";
//     8: string | null | "";
//     9: string | null | "";
//     10: string | null | "";
//     11: string | null | "";
//     12: string | null | "";
//     13: string | null | "";
//     14: string | null | "";
//     15: string | null | "";
// }>;

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
    setTimeRecord: Dispatch<SetStateAction<timeRecordType[]>>;
    // selectYear: MutableRefObject<Dropdown>;
    // selectMonth: MutableRefObject<Dropdown>;
    fixedArriveTime: MutableRefObject<string>;
    fixedLeavingTime: MutableRefObject<string>;
    fixedlunchTime: MutableRefObject<string>;
    // totalSchedulePredictionWorkingTime: MutableRefObject<string>;
    // totalActualWorkingTime: MutableRefObject<string>;
    // totalNightWorkingTime: MutableRefObject<string>;
    // totalPaidLeaveApplydate: MutableRefObject<string>;
    // totalPaidLeaveApplyHour: MutableRefObject<string>;
    calcData: calcDataType;
};

export type calcDataType = {
    totalSchedulePredictionWorkingTime?: string;
    totalActualWorkingTime?: string;
    totalNightWorkingTime?: string;
    totalPaidLeaveApplydate?: string;
    totalPaidLeaveApplyHour?: string;
};
