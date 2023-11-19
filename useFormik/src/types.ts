export interface UserInfo {
  personal: {
    name: string;
    lastName: string;
    age: number;
  };
  location: {
    address: string;
    country: string;
  };
}

export interface Option<T> {
  label: string;
  value: T;
}
