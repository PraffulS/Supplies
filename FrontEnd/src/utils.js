const isLoggedIn = () => {
  if (sessionStorage.getItem("supplier_id")) return 1;

  if (sessionStorage.getItem("admin_id")) return 2;

  return false;
};

const logout = () => {
  sessionStorage.removeItem("supplier_id");
  sessionStorage.removeItem("admin_id");
  window.location.href = "";
};

const createOptionForReactSelect = (list) => {
  const options = [];
  if (!list) {
    return options;
  }

  list.forEach((instance) => {
    options.push({
      value: instance["id"],
      label: instance["business_name"],
      ...instance
    });
  });

  return options;
};

export { isLoggedIn, logout, createOptionForReactSelect };
