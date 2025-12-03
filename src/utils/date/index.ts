import dayjs from "dayjs";

export const date = {
  now: () => dayjs(),
  format: (d: any, f = "DD/MM/YYYY HH:mm") => dayjs(d).format(f),
};
