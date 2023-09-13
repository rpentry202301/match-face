import { menuContentsArray } from './Menu.test';
import { falseAnswerRequests, trueAnswerRequests } from './Notification.test';

const menuData = menuContentsArray;
const falseData = falseAnswerRequests;
const trueData = trueAnswerRequests;

export const menuDataMock = () => {
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: { menuData } }),
    });
  });
};
