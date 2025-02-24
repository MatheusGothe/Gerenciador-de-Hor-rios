export const parseTime = (timeStr) => {
    // Cria uma data com a data arbitrária e o horário informado
    return new Date(`1999-01-01T${timeStr}Z`);
  };

export const isValidTimeFormat = (time) => /^\d{2}:\d{2}:\d{2}$/.test(time);
