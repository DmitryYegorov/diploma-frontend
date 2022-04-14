import { http } from "../index";
import { RRule, RRuleSet } from "rrule";

export const getAllEvents = async () => http.get("/event");

export const addNewEvent = async (data: any) => {
  const mappedData = {
    type: data.type,
    startDate: data.startDate,
    endDate: data.endDate,
    isRecurring: !!data.rRule,
    isAllDay: !!data.allDay,
    rRule: data.rRule,
    title: data.title || "",
    note: data.note || "",
  };

  return http.post("/event", mappedData);
};

export const updateEvent = async (data: any, id: string) =>
  http.put(`/event/${id}`, data);

export const removeEvent = async (id: string | number) =>
  http.delete(`/event/${id}`);
