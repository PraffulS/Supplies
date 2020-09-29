import $ from "jquery";

$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader("X-CSRFToken", sessionStorage.getItem('auth_key'));
  },
});

export function doGet(path, successCallback, failureCallback) {
  const url = `http://localhost:8000/${path}`;

  return $.ajax({
    url,
    type: "GET",
    success: (response) => {
      if (successCallback) {
        successCallback(response || "");
      }

      return response || {};
    },
    error: (request, status, error) => {
      if (failureCallback) {
        // failureCallback(error);
        failureCallback(request?.responseText || error);
      }
    },
  });
}

export const doPost = (
  path,
  data,
  successCallback,
  failureCallback,
  contentType
) => {
  const url = `http://localhost:8000/${path}`;

  return $.ajax({
    url,
    type: "POST",
    data,
    ...(contentType ? { contentType } : {}),
    success: (response) => {
      if (successCallback) {
        successCallback(response || "");
      }

      return response || {};
    },
    error: (request, status, error) => {
      if (failureCallback) {
        failureCallback(error, request);
      }
    },
  });
};
