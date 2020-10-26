// eslint-disable-next-line no-shadow
export enum Category {
  CONTROLLER = 'Controller',
  INTELLIGENCE = 'Intelligence',
  SENSOR = 'Sensor',
  SIDEKICK = 'Sidekick',
  UNKNOWN = 'Unknown',
}

export const categories = [
  Category.UNKNOWN,
  Category.INTELLIGENCE,
  Category.CONTROLLER,
  Category.SENSOR,
  Category.SIDEKICK,
];

export default Category;
