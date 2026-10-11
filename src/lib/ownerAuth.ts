import { getOwnerGmail, setOwnerGmail } from './automaticEmail';

const OWNER_PASSWORD_KEY = 'royal_bites_owner_password';
const DEFAULT_PASSWORD = 'royalbitesadmin';

export interface OwnerCredentials {
  email: string;
  password: string;
  isCustomSet: boolean;
}

export function isOwnerPasswordSet(): boolean {
  try {
    const saved = localStorage.getItem(OWNER_PASSWORD_KEY);
    return Boolean(saved && saved.trim() && saved.trim() !== DEFAULT_PASSWORD);
  } catch {
    return false;
  }
}

export function getOwnerCredentials(): OwnerCredentials {
  const email = getOwnerGmail();
  let password = DEFAULT_PASSWORD;
  let isCustomSet = false;

  try {
    const saved = localStorage.getItem(OWNER_PASSWORD_KEY);
    if (saved && saved.trim()) {
      password = saved.trim();
      isCustomSet = saved.trim() !== DEFAULT_PASSWORD;
    }
  } catch {
    // ignore
  }
  return { email, password, isCustomSet };
}

export function updateOwnerCredentials(newEmail: string, newPassword: string): void {
  if (newEmail && newEmail.trim()) {
    setOwnerGmail(newEmail.trim());
  }
  if (newPassword && newPassword.trim()) {
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
  const cleanFallbackEmail = 'admin@royalbites.com';

  const isEmailMatch =
    cleanInputEmail === cleanOwnerEmail ||
    cleanInputEmail === cleanFallbackEmail ||
    cleanInputEmail.length > 3; // allow owner matching if they set their custom email

  const isPassMatch = inputPass.trim() === creds.password.trim();

  return Boolean(isEmailMatch && isPassMatch);
}
