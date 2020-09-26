const isLoggedIn = () => {
  if (sessionStorage.getItem("supplier_id")) return true;

  return false;
};

const logout = () => {
  sessionStorage.removeItem("supplier_id");
  window.location.href = "";
};

export { isLoggedIn, logout };
