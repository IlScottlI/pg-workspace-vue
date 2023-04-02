const baseURL = "http://localhost:8088";
import Swal from "sweetalert2";
import moment from "moment";
const days = [];
for (let i = 1; i < 32; i++) {
  const day = { id: i, value: i.toString(), name: i.toString() };
  days.push(day);
}

const frequencies = [
  { id: 0, value: "HOURLY", name: "Hourly" },
  { id: 1, value: "DAILY", name: "Daily" },
  { id: 2, value: "WEEKLY", name: "Weekly" },
  { id: 3, value: "MONTHLY", name: "Monthly" },
  { id: 4, value: "YEARLY", name: "Yearly" },
];
const months = [
  { id: 1, value: "1", name: "January" },
  { id: 2, value: "2", name: "February" },
  { id: 3, value: "3", name: "March" },
  { id: 4, value: "4", name: "April" },
  { id: 5, value: "5", name: "May" },
  { id: 6, value: "6", name: "June" },
  { id: 7, value: "7", name: "July" },
  { id: 8, value: "8", name: "August" },
  { id: 9, value: "9", name: "September" },
  { id: 10, value: "10", name: "October" },
  { id: 11, value: "11", name: "November" },
  { id: 12, value: "12", name: "December" },
];
const weekdays = [
  { i: 0, id: "SU", name: "Sun", text: "Sunday" },
  { i: 1, id: "MO", name: "Mon", text: "Monday" },
  { i: 2, id: "TU", name: "Tue", text: "Tuesday" },
  { i: 3, id: "WE", name: "Wed", text: "Wednesday" },
  { i: 4, id: "TH", name: "Thu", text: "Thursday" },
  { i: 5, id: "FR", name: "Fri", text: "Friday" },
  { i: 6, id: "SA", name: "Sat", text: "Saturday" },
];

const stuff = {
  baseURL,
  baseUrl: () => {
    return baseURL;
  },
  log: (e) => {
    console.log(e);
  },
  // API Functions
  getGraphUser: async (val, accessToken, top = 6) => {
    return await fetch(
      `https://graph.microsoft.com/v1.0/me/people?$search=%22${val}%22&$top=${top}&$filter=personType/class%20eq%20%27Person%27`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) => req.json());
  },
  searchPlant: async (officeLocation) => {
    return await fetch(
      `${baseURL}/api/plants/?officeLocation=${officeLocation}`
    ).then((req) => req.json());
  },
  postPlant: async (raw) => {
    return await fetch(`${baseURL}/api/plants/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  searchUsers: async (email) => {
    return await fetch(`${baseURL}/api/users/?email=${email}`).then((req) =>
      req.json()
    );
  },
  getPages: async () => {
    return await fetch(
      "https://tablerstation.us/APIs/PGWorkspace/getPage.php"
    ).then((req) => req.json());
  },
  getGroupsByParentId: async (ParentId) => {
    return await fetch(
      "https://tablerstation.us/APIs/PGWorkspace/getGroup.php?ParentId=" +
      ParentId
    ).then((req) => req.json());
  },
  getGroupsByPageParentId: async (PageParentId) => {
    return await fetch(
      "https://tablerstation.us/APIs/PGWorkspace/getGroup.php?PageParentId=" +
      PageParentId
    ).then((req) => req.json());
  },
  getTilesByPageParentId: async (PageParentId) => {
    return await fetch(
      "https://tablerstation.us/APIs/PGWorkspace/getTile.php?PageParentId=" +
      PageParentId
    ).then((req) => req.json());
  },
  postUser: async (raw) => {
    return await fetch(`${baseURL}/api/users/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  patchUser: async (raw, id) => {
    return await fetch(`${baseURL}/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  getPendingStatus: async () => {
    return await fetch(
      `${baseURL}/api/status/?no_page=true&depth=0&name=Pending`
    ).then((req) => req.json());
  },
  getApproversByUserId: async (id) => {
    return await fetch(
      `${baseURL}/api/approvers/?no_page=true&depth=0&user=${id}`
    ).then((req) => req.json());
  },
  getLocales: async () => {
    return await fetch(`${baseURL}/api/locales/`).then((req) => req.json());
  },
  getResponsesByCalendarId: async (id, depth = 0) => {
    return await fetch(
      `${baseURL}/api/responses/?calendar=${id}&depth=${depth}`
    ).then((req) => req.json());
  },
  getTracksByCalendarId: async (id, depth = 0) => {
    return await fetch(
      `${baseURL}/api/tracks/?calendar_dt=${id}&depth=${depth}`
    ).then((req) => req.json());
  },
  getCommentsByCalendarId: async (id, depth = 0) => {
    return await fetch(
      `${baseURL}/api/comments/?calendar_dt=${id}&depth=${depth}&order_by=desc%20created_at`
    ).then((req) => req.json());
  },
  getHistoryByCalendarId: async (id, depth = 0) => {
    return await fetch(
      `${baseURL}/api/history/?calendar_dt=${id}&depth=${depth}&order_by=desc%20created_at`
    ).then((req) => req.json());
  },
  getAttachmentsByUUID: async (uuid, depth = 0) => {
    return await fetch(
      `${baseURL}/api/attachments/?uuid=${uuid}&depth=${depth}&order_by=desc%20created_at`
    ).then((req) => req.json());
  },
  postLocale: async (raw) => {
    return await fetch(`${baseURL}/api/locales/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  postCalendar: async (raw) => {
    return await fetch(`${baseURL}/api/calendars/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  patchCalendar: async (raw, id) => {
    return await fetch(`${baseURL}/api/calendars/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "PATCH",
    }).then((req) => req.json());
  },
  deleteTracks: async (id) => {
    return await fetch(`${baseURL}/api/tracks/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((req) => req.text());
  },
  postTracks: async (raw) => {
    return await fetch(`${baseURL}/api/tracks/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  patchTracks: async (raw, id) => {
    return await fetch(`${baseURL}/api/tracks/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "PATCH",
    }).then((req) => req.json());
  },
  postResponse: async (raw) => {
    return await fetch(`${baseURL}/api/responses/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    })
      .then((req) => req.json())
      .catch((e) => {
        Swal.fire({
          title: "Failed to Save Response",
          text: e,
          icon: "error",
          confirmButtonText: "Alright",
          toast: true,
        });
      });
  },
  patchResponse: async (raw, id) => {
    return await fetch(`${baseURL}/api/responses/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "PATCH",
    }).then((req) => req.json());
  },
  deleteResponse: async (id) => {
    return await fetch(`${baseURL}/api/responses/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((req) => req.json());
  },
  postHistory: async (raw) => {
    return await fetch(`${baseURL}/api/history/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    }).then((req) => req.json());
  },
  postComment: async (raw) => {
    return await fetch(`${baseURL}/api/comments/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      method: "POST",
    })
      .then((req) => req.json())
      .catch((e) => {
        Swal.fire({
          title: "Failed to Post Comment",
          text: e,
          icon: "error",
          confirmButtonText: "Alright",
          toast: true,
        });
      });
  },
  getPlants: async () => {
    return await fetch(`${baseURL}/api/plants/`).then((req) => req.json());
  },
  getBusinessByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/businesses/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getStatusByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/status/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getTypeByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/types/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getReasonByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/reasons/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getQuestionsByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/questions/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getModuleByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/modules/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getModuleByBusinessIds: async (ids) => {
    return await fetch(`${baseURL}/api/modules/?businesses__in=${ids}`).then(
      (req) => req.json()
    );
  },
  getApproverByBusinessIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&business__in=${ids}`
    ).then((req) => req.json());
  },
  getDepartmentByModuleIds: async (ids) => {
    return await fetch(`${baseURL}/api/departments/?module__in=${ids}`).then(
      (req) => req.json()
    );
  },
  getDepartmentByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/departments/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getAreaByDepartmentIds: async (ids) => {
    return await fetch(`${baseURL}/api/areas/?department__in=${ids}`).then(
      (req) => req.json()
    );
  },
  getAreaByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/areas/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getApproversByBusinessIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&business__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByModuleIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&module__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByDepartmentIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&department__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByAreaIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&area__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByBusinessIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&business__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByModuleIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&module__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByDepartmentIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&department__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByAreaIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&area__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByTypeIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&types__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByTypeIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&types__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByReasonIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&reasons__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByReasonIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&reasons__in=${ids}`
    ).then((req) => req.json());
  },
  getCalendars: async (
    plant,
    start,
    end,
    status = "",
    type = "",
    reason = "",
    business = "",
    module = "",
    department = "",
    area = ""
  ) => {
    return await fetch(
      `${baseURL}/calendar_api?plant=${plant}&start_date=${start}&end_date=${end}&status=${status}&type=${type}&reason=${reason}&business=${business}&module=${module}&department=${department}&area=${area}`
    ).then((req) => req.json());
  },

  // Standard Functions
  calRepeat: (values, weekdaysSelected) => {
    let recurrenceRule = {
      FREQ: "",
      BYDAY: "",
      COUNT: "",
      UNTIL: "",
      INTERVAL: "",
      BYMONTHDAY: "",
      BYMONTH: "",
      BYSETPOS: "",
    };
    if (values.repeat === false) return;
    let key = values.repeatFreq.value;
    let string = `FREQ=${key}`;
    recurrenceRule.FREQ = key;
    switch (key) {
      case "HOURLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "DAILY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "WEEKLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.weekdaysSelected.length > 0) {
          let arr = [];
          for (let i = 0; i < weekdaysSelected.length; i++) {
            arr.push(weekdaysSelected[i]);
          }
          string += `;BYDAY=${arr.join(",")}`;
          recurrenceRule.BYDAY = arr.join(",");
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "MONTHLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        if (values.monthRepeatType === "On") {
          string += `;BYMONTHDAY=${values.monthDay}`;
          recurrenceRule.BYMONTHDAY = values.monthDay;
        }
        if (values.monthRepeatType === "The") {
          string += `;BYSETPOS=${values.monthRepeatFreq}`;
          recurrenceRule.BYSETPOS = values.monthRepeatFreq
            .map((e) => {
              return e.id;
            })
            .join(",");
          string += `;BYDAY=${values.monthRepeatFreqWeek}`;
          recurrenceRule.BYDAY = values.monthRepeatFreqWeek;
        }
        break;
      case "YEARLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endDate) {
          string += `;BYMONTHDAY=${values.endDay.id};BYMONTH=${values.monthSelected.id}`;
          recurrenceRule.BYMONTHDAY = values.endDay.id;
          recurrenceRule.BYMONTH = values.monthSelected.id;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
    }
    return string;
  },
  frequencies,
  months,
  weekdays,
  days,
  defaultLocale: {
    name: "en",
    language: "English",
    JSON_Data: [
      {
        term: "appTitle",
        enTrans: "Downtime Planner",
        translated: "Downtime Planner",
        langCode: "en",
      },
      {
        term: "newRequest",
        enTrans: "New Request",
        translated: "New Request",
        langCode: "en",
      },
      {
        term: "viewRequest",
        enTrans: "View Requests",
        translated: "View Requests",
        langCode: "en",
      },
      {
        term: "dtCalendar",
        enTrans: "Downtime Calendar",
        translated: "Downtime Calendar",
        langCode: "en",
      },
      {
        term: "dtDashboard",
        enTrans: "Downtime Dashboard",
        translated: "Downtime Dashboard",
        langCode: "en",
      },
      {
        term: "approvals",
        enTrans: "Approvals",
        translated: "Approvals",
        langCode: "en",
      },
      {
        term: "endRepeat",
        enTrans: "End Repeat",
        translated: "End Repeat",
        langCode: "en",
      },
      {
        term: "goBtn",
        enTrans: "GO",
        translated: "GO",
        langCode: "en",
      },
      {
        term: "projectName",
        enTrans: "Project Name",
        translated: "Project Name",
        langCode: "en",
      },
      {
        term: "dtOwner",
        enTrans: "Downtime Owner",
        translated: "Downtime Owner",
        langCode: "en",
      },
      {
        term: "business",
        enTrans: "Business",
        translated: "Business",
        langCode: "en",
      },
      {
        term: "module",
        enTrans: "Module",
        translated: "Module",
        langCode: "en",
      },
      {
        term: "department",
        enTrans: "Department",
        translated: "Department",
        langCode: "en",
      },
      {
        term: "area",
        enTrans: "Area",
        translated: "Area",
        langCode: "en",
      },
      {
        term: "requestType",
        enTrans: "Type of Request",
        translated: "Type of Request",
        langCode: "en",
      },
      {
        term: "dtReasonCode",
        enTrans: "Downtime Reason Code",
        translated: "Downtime Reason Code",
        langCode: "en",
      },
      {
        term: "dateStart",
        enTrans: "Start",
        translated: "Start",
        langCode: "en",
      },
      {
        term: "dateEnd",
        enTrans: "End",
        translated: "End",
        langCode: "en",
      },
      {
        term: "repeat",
        enTrans: "Repeat",
        translated: "Repeat",
        langCode: "en",
      },
      {
        term: "frequency",
        enTrans: "Frequency",
        translated: "Frequency",
        langCode: "en",
      },
      {
        term: "every",
        enTrans: "Every",
        translated: "Every",
        langCode: "en",
      },
      {
        term: "weeks",
        enTrans: "week(s)",
        translated: "week(s)",
        langCode: "en",
      },
      {
        term: "days",
        enTrans: "days(s)",
        translated: "days(s)",
        langCode: "en",
      },
      {
        term: "hours",
        enTrans: "hour(s)",
        translated: "hour(s)",
        langCode: "en",
      },
      {
        term: "months",
        enTrans: "month(s)",
        translated: "month(s)",
        langCode: "en",
      },
      {
        term: "years",
        enTrans: "year(s)",
        translated: "year(s)",
        langCode: "en",
      },
      {
        term: "weekly",
        enTrans: "Weekly",
        translated: "Weekly",
        langCode: "en",
      },
      {
        term: "daily",
        enTrans: "Daily",
        translated: "Daily",
        langCode: "en",
      },
      {
        term: "hourly",
        enTrans: "Hourly",
        translated: "Hourly",
        langCode: "en",
      },
      {
        term: "monthly",
        enTrans: "Monthly",
        translated: "Monthly",
        langCode: "en",
      },
      {
        term: "yearly",
        enTrans: "Yearly",
        translated: "Yearly",
        langCode: "en",
      },
      {
        term: "am",
        enTrans: "AM",
        translated: "AM",
        langCode: "en",
      },
      {
        term: "pm",
        enTrans: "PM",
        translated: "PM",
        langCode: "en",
      },
      {
        term: "never",
        enTrans: "Never",
        translated: "Never",
        langCode: "en",
      },
      {
        term: "on",
        enTrans: "On",
        translated: "On",
        langCode: "en",
      },
      {
        term: "after",
        enTrans: "After",
        translated: "After",
        langCode: "en",
      },
      {
        term: "repeatOn",
        enTrans: "Repeat On",
        translated: "Repeat On",
        langCode: "en",
      },
      {
        term: "mon",
        enTrans: "Mon",
        translated: "Mon",
        langCode: "en",
      },
      {
        term: "tue",
        enTrans: "Tue",
        translated: "Tue",
        langCode: "en",
      },
      {
        term: "wed",
        enTrans: "Wed",
        translated: "Wed",
        langCode: "en",
      },
      {
        term: "thu",
        enTrans: "Thu",
        translated: "Thu",
        langCode: "en",
      },
      {
        term: "fri",
        enTrans: "Fri",
        translated: "Fri",
        langCode: "en",
      },
      {
        term: "sat",
        enTrans: "Sat",
        translated: "Sat",
        langCode: "en",
      },
      {
        term: "sun",
        enTrans: "Sun",
        translated: "Sun",
        langCode: "en",
      },
      {
        term: "jan",
        enTrans: "January",
        translated: "January",
        langCode: "en",
      },
      {
        term: "feb",
        enTrans: "February",
        translated: "February",
        langCode: "en",
      },
      {
        term: "mar",
        enTrans: "March",
        translated: "March",
        langCode: "en",
      },
      {
        term: "apr",
        enTrans: "April",
        translated: "April",
        langCode: "en",
      },
      {
        term: "may",
        enTrans: "May",
        translated: "May",
        langCode: "en",
      },
      {
        term: "jun",
        enTrans: "June",
        translated: "June",
        langCode: "en",
      },
      {
        term: "jul",
        enTrans: "July",
        translated: "July",
        langCode: "en",
      },
      {
        term: "aug",
        enTrans: "August",
        translated: "August",
        langCode: "en",
      },
      {
        term: "sep",
        enTrans: "September",
        translated: "September",
        langCode: "en",
      },
      {
        term: "oct",
        enTrans: "October",
        translated: "October",
        langCode: "en",
      },
      {
        term: "nov",
        enTrans: "November",
        translated: "November",
        langCode: "en",
      },
      {
        term: "dec",
        enTrans: "December",
        translated: "December",
        langCode: "en",
      },
      {
        term: "newDTrequest",
        enTrans: "New Downtime Request",
        translated: "New Downtime Request",
        langCode: "en",
      },
      {
        term: "editDTrequest",
        enTrans: "Edit Request:",
        translated: "Edit Request:",
        langCode: "en",
      },
      {
        term: "status",
        enTrans: "Status",
        translated: "Status",
        langCode: "en",
      },
      {
        term: "type",
        enTrans: "Type",
        translated: "Type",
        langCode: "en",
      },
      {
        term: "dtReason",
        enTrans: "Downtime Reason",
        translated: "Downtime Reason",
        langCode: "en",
      },
      {
        term: "itemsNotFound",
        enTrans: "No Results Found",
        translated: "No Results Found",
        langCode: "en",
      },
    ],
    date_picker: {
      locale: {
        format: "MM/DD/YYYY HH:mm",
        separator: " - ",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        fromLabel: "From",
        toLabel: "To",
        customRangeLabel: "Custom",
        weekLabel: "W",
        daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        firstDay: 1,
      },
    },
    time_zone: "US/Eastern",
  },
  repeatValues: {
    start: moment().startOf("hour")._d,
    end: moment().startOf("hour").add(4, "hour")._d,
    repeat: false,
    repeatFreq: frequencies[0],
    interval: 1,
    neverCheck: true,
    onCheck: false,
    endOnCheck: "",
    afterCheck: false,
    afterCheckValue: 1,
    weekdays: weekdays,
    weeks: [
      { id: 1, name: "First" },
      { id: 2, name: "Second" },
      { id: 3, name: "Third" },
      { id: 4, name: "Forth" },
    ],
    frequencies: frequencies,
    months: months,
    days: days,
    weekdaysSelected: [Number(moment().format("d"))],
    weekdaysSelectedString: [moment().format("dd").toUpperCase()],
    monthSelected: {
      id: Number(moment().format("M")),
      value: moment().format("M"),
      name: moment().format("MMMM"),
    },
    monthRepeatType: "On",
    monthDay: Number(moment().format("D")),
    isoWeek: Number(moment().isoWeek()),
    monthRepeatFreq: [1],
    monthRepeatFreqWeek: moment().format("dd").toUpperCase(),
    endRepeat: "Never",
    endAfter: 1,
    datePicker: false,
    endDate: moment().format("YYYY-MM-DD"),
    endDay: {
      id: Number(moment().format("D")),
      value: moment().format("D"),
      name: moment().format("D"),
    },
  },
  moment,
};

export default stuff;
