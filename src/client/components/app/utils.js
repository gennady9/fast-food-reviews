const getFormattedTime = (time) => {
  const current_datetime = new Date(time);
  return current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
}

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export {getFormattedTime, arrayBufferToBase64};