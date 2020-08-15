import keyMirror from "key-mirror";
let types = keyMirror({
  CHANGE_NAME: null,
  CHANGE_AGE: null,
  CHANGE_ASYNCDATA: null,

  CHANGE_COMPUTER_COLOR: null,
  CHANGE_COMPUTER_SIZE: null,
  CHANGE_COMPUTER_PRIZE: null,
  CHAGE_LEFTNAV: null,
  CHANGE_CHECKEDNAV: null,
  CHANGE_LEFTNAVSTATUS: null,
  SET_ENVLISTS: null,
  SAVE_LEFTNAVCHECKEDMETHOD: null,
});

const moduleConfig = [
  { label: "uve", value: "uve" },
  { label: "idx", value: "idx" },
  { label: "wax", value: "wax" },
  { label: "render", value: "render" },
  { label: "topfans", value: "topfans" },
  { label: "nofans", value: "nofans" },
];
export { moduleConfig, types };
