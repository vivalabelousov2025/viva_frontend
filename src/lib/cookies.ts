export function getCookie(c_name: string) {
  let c_value = document.cookie;
  let c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = "";
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    let c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

export function setCookie(c_name: string, value: string, exdays: number) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  const c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

export function deleteCookie(name: string) {
  setCookie(name, "", -1);
}
