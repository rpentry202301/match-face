import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HistoriesPage from '../../../../../app/(pages)/admin/(other)/histories/page'
import '@testing-library/jest-dom'

describe('管理者/履歴一覧画面のテスト',() => {
    describe('スナップショットテスト',() => {
        it('レンダリング時',async() => {
            const view = render(<HistoriesPage/>)
            expect(view.container).toMatchSnapshot()
        })
    })
    describe('リストテスト',()=>{
        it('オープンボタンを押すとクローズボタンとユーザーリストが表示される',async()=>{
            const user = userEvent.setup()
            render(<HistoriesPage />);
            const openButton = screen.getByTestId('open_1');
            await user.click(openButton);
            const closeButton = screen.getByTestId('close_1');
            const userList = screen.getByText('氏名')
            expect(closeButton).toBeInTheDocument();
            expect(userList).toBeInTheDocument();
            expect(openButton).not.toBeInTheDocument();
        })
    })
    describe('絞り込みテスト',()=>{
        
    })
})
