export const toSeconds = (input: string) => {
  const units = {
    s: 1, // seconds
    m: 60, // minutes
    h: 60 * 60, // hours
    d: 60 * 60 * 24, // days
    w: 60 * 60 * 24 * 7, // weeks
  };
  const match = input.match(/(\d+)([smhdw])/);

  if (!match) {
    throw new Error('Invalid input format');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * (units[unit] || 0);
};
