export type DataSourceType = {
  id: string;
  name: string;
  address: string;
  age: number;
  children?: DataSourceType[];
};

const genDataSource = (length = 5) =>
  Array.from({ length }).map(
    (_, index) =>
      ({
        id: `${index + 1 * 1000}`,
        age: index + 1,
        name: `Name ${index + 1}`,
        address: `北京市朝阳公园`,
      } as DataSourceType)
  );

export default genDataSource;
