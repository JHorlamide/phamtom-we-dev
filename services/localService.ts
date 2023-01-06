// setters
export const saveCredentials = (email: any, password: any) => {
  localStorage.setItem(
    'phamtom_cr3dentials',
    JSON.stringify({
      email,
      password
    })
  );
};

export const saveToken = (token: any) => {
  try {
    localStorage.setItem('phamtom_t@k3n', token);
  } catch (e) {
    console.log('Error saving token');
  }
};

export const saveAdmin = (data: any) => {
  try {
    localStorage.setItem('admin', data);
  } catch (e) {
    console.log('Error saving admin');
  }
};

export const setRedirectTo = (path: string) => {
  try {
    localStorage.setItem('redirectTo', path);
  } catch (e) {
    console.log('Error saving redirectTo');
  }
};

// getters
export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('phamtom_t@k3n');

    if (token) {
      // console.log(token);
      return token;
    }
    return null;
  }
};
export const getCredentials = () => {
  const cred = localStorage.getItem('phamtom_cr3dentials');

  if (cred === null) {
    return null;
  }
  return JSON.parse(cred);
};

export const getAdmin = () => {
  if (typeof window !== 'undefined') {
    const admin = localStorage.getItem('admin');

    if (admin) {
      return admin;
    }
    return null;
  }
};

export const redirectTo = () => {
  if (typeof window !== 'undefined') {
    const redirectTo = localStorage.getItem('redirectTo');

    if (redirectTo) {
      return redirectTo;
    }
    return null;
  }
};

// remove

export const removeCred = () => {
  localStorage.removeItem('phamtom_cr3dentials');
  removeToken();
};

export const removeToken = () => {
  localStorage.removeItem('phamtom_t@k3n');
  localStorage.removeItem('admin');
};

export const removeRedirectTo = () => {
  localStorage.removeItem('redirectTo');
};
