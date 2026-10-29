export const validEmail = (email) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const cleanText = (value, max = 160) => typeof value === 'string' ? value.trim().slice(0, max) : '';
