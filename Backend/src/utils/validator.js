import { object, number, string, boolean } from 'joi';

export function simulationInput(payload) {
  const schema = object({
    numDrivers: number().integer().min(1).required(),
    routeStartTime: string().pattern(/^\d{2}:\d{2}$/).required(),
    maxHoursPerDriver: number().min(1).required(),
    persist: boolean().optional()
  });
  return schema.validate(payload, { abortEarly: false });
}
