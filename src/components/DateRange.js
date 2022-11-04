import { useState } from "react";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

export default function DateRange(props) {
  const [state, setState] = useState([
    {
      startDate: moment().toDate(),
      endDate: moment().add(7, "days").toDate(),
      key: "selection",
    },
  ]);

  return (
    <DateRangePicker
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={false}
      showMonthAndYearPickers={false}
      moveRangeOnFirstSelection={false}
      preventSnapRefocus={true}
      editableDateInputs={true}
      dateDisplayFormat={"MM/dd/yyyy"}
      months={2}
      ranges={state}
      staticRanges={staticRanges}
      direction={"horizontal"}
    />
  );
}

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      moment(range.startDate).isSame(moment(definedRange.startDate)) &&
      moment(range.endDate).isSame(moment(definedRange.endDate))
    );
  },
};

const createStaticRanges = (ranges) => {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
};

const staticRanges = createStaticRanges([
  {
    label: "Yesterday",
    range: () => ({
      startDate: moment().subtract(1, "day").startOf("day").toDate(),
      endDate: moment().subtract(1, "day").endOf("day").toDate(),
    }),
  },
  {
    label: "This Week",
    range: () => {
      let day = moment().day();
      return {
        startDate: moment().subtract(day, "day").startOf("day").toDate(),
        endDate: moment().subtract(1, "day").endOf("day").toDate(),
      };
    },
  },
  {
    label: "Last Week",
    range: () => ({
      startDate: moment().subtract(7, "day").startOf("day").toDate(),
      endDate: moment().subtract(1, "day").endOf("day").toDate(),
    }),
  },
  {
    label: "This Month",
    range: () => {
      let mtd = moment().date();
      return {
        startDate: moment()
          .subtract(mtd - 1, "day")
          .startOf("day")
          .toDate(),
        endDate: moment().subtract(1, "day").endOf("day").toDate(),
      };
    },
  },
  {
    label: "Last Month",
    range: () => {
      let mtd = moment().date();
      let prevMonthStart = moment()
        .subtract(1, "month")
        .subtract(mtd - 1, "day")
        .startOf("day");
      let prevMonthEnd = moment().subtract(mtd, "day").endOf("day");
      return {
        startDate: prevMonthStart.toDate(),
        endDate: prevMonthEnd.toDate(),
      };
    },
  },
  {
    label: "Last 3 Months",
    range: () => {
      let mtd = moment().date();
      let prev3MonthStart = moment()
        .subtract(3, "month")
        .subtract(mtd - 1, "day")
        .startOf("day");
      let prevMonthEnd = moment().subtract(mtd, "day").endOf("day");
      return {
        startDate: prev3MonthStart.toDate(),
        endDate: prevMonthEnd.toDate(),
      };
    },
  },
  {
    label: "Last 6 Months",
    range: () => {
      let mtd = moment().date();
      let prev6MonthStart = moment()
        .subtract(6, "month")
        .subtract(mtd - 1, "day")
        .startOf("day");
      let prevMonthEnd = moment().subtract(mtd, "day").endOf("day");
      return {
        startDate: prev6MonthStart.toDate(),
        endDate: prevMonthEnd.toDate(),
      };
    },
  },
  {
    label: "This Year (YTD)",
    range: () => ({
      startDate: moment().startOf("year").toDate(),
      endDate: moment().subtract(1, "day").endOf("day").toDate(),
    }),
  },
]);
