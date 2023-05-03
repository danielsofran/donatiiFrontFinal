import {axiosInstance} from "./axiosInstance";

class Test {
  constructor() {
    console.log('Tests');
    this.test1();
  }
  test1() {
      axiosInstance.get('/users').then((response) => {
        console.log(response.data);
      });
  }
}