import Notification from '@/components/pages/general/top/Notification';
import { falseAnswerRequests, trueAnswerRequests } from '@/const/notification';
import { render } from '@testing-library/react';

describe('スナップショット', () => {
  test('スナップショット', () => {
    const { container } = render(
      <Notification
        answeredAnswerRequests={trueAnswerRequests}
        notAnsweredAnswerRequests={falseAnswerRequests}
        className=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
