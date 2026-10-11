import { getOwnerGmail, setOwnerGmail } from './automaticEmail';

const OWNER_PASSWORD_KEY = 'royal_bites_owner_password';
const DEFAULT_PASSWORD = 'royalbitesadmin';

export interface OwnerCredentials {
  email: string;
  password: string;
}

export function getOwnerCredentials(): OwnerCredentials {
  const email = getOwnerGmail();
  let password = DEFAULT_PASSWORD;
  try {
    const saved = localStorage.getItem(OWNER_PASSWORD_KEY);
    if (saved && saved.trim()) {
      password = saved.trim();
    }
  } catch {
    // ignore
  }
  return { email, password };
}

export function updateOwnerCredentials(newEmail: string, newPassword: string): void {
  if (newEmail.trim()) {
    setOwnerGmail(newEmail.trim());
  }
  if (newPassword.trim()) {
    try {
      localStorage.setItem(OWNER_PASSWORD_KEY, newPassword.trim());
    } catch {
      // ignore
    }
  }
}

export function verifyOwnerLogin(inputEmail: string, inputPass: string): boolean {
  const creds = getOwnerCredentials();
  const cleanInputEmail = inputEmail.trim().toLowerCase();
  const cleanOwnerEmail = creds.email.trim().toLowerCase();
  const cleanFallback = 'admin@royalbites.com';

  const isEmailMatch = cleanInputEmail === cleanOwnerEmail || cleanInputEmail === cleanFallback;
  const isPassMatch = inputPass === creds.password;

  return isEmailMatch && isPassMatch;
}
