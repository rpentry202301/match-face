import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HistoriesPage from '@/app/(pages)/admin/(other)/histories/page'
import React from 'react'
import "@testing-library/jest-dom"
import {AppRouterContextProviderMock} from './app-router-context-provider-mock'
import HistoriesList from '@/components/pages/admin/histories/list'

describe('管理者/履歴一覧画面のテスト',() => {
    const user = userEvent.setup()
    const push = jest.fn()

    describe('スナップショットテスト',() => {
        it('レンダリング時',async() => {
            const view = render(<HistoriesPage/>)
            expect(view.container).toMatchSnapshot()
        })
    })
    describe('リストテスト',()=>{
        beforeEach(()=>{
            render(<AppRouterContextProviderMock router={{ push }}><HistoriesPage /></AppRouterContextProviderMock>);
        })
        it('オープンボタンを押すとクローズボタンとユーザーリストが表示される',async()=>{
            const openButton = screen.getByTestId('open_1');
            await user.click(openButton);
            const closeButton = screen.getByTestId('close_1');
            const userList = screen.getByText('氏名')
            expect(closeButton).toBeInTheDocument();
            expect(userList).toBeInTheDocument();
            expect(openButton).not.toBeInTheDocument();
        })
        it('詳細ボタンを押すとページ遷移する',async()=>{
            const openButton = screen.getByTestId('open_1')
            await (user.click(openButton))
            const detailButton = screen.getByTestId('detail_1')
            expect(detailButton).toBeTruthy()
            await user.click(detailButton)
            expect(push).toBeCalled()
            expect(push).toBeCalledWith('/admin/review/1')
        })
    })
    describe('絞り込みテスト',()=>{
        beforeEach(()=>{
            render(<AppRouterContextProviderMock router={{ push }}><HistoriesPage /></AppRouterContextProviderMock>);
        })
        it('回答月の選択',async()=>{
            const beforeSelectMonth = screen.getByRole("option",{name:"--"}) as HTMLOptionElement
            expect(beforeSelectMonth.selected).toBe(true)
            await user.selectOptions(screen.getByTestId('month'),'2023-07')
            const selectMonth = screen.getByRole("option",{name:"2023-07"}) as HTMLOptionElement
            expect(selectMonth.selected).toBe(true)
            expect(beforeSelectMonth.selected).toBe(false)
        })
        it('職種の選択',async()=>{
            const selectJava = screen.getByRole('button',{name:"Java"})
            await user.click(selectJava)
            expect(selectJava).toHaveClass("bg-deep-gray")
            await user.click(selectJava)
            expect(selectJava).toHaveClass("bg-white")
        })
        it('技術の選択',async()=>{
            const selectTypescript = screen.getByRole('checkbox',{name:"TypeScript"})
            const selectReact = screen.getByRole('checkbox',{name:"React"})
            // Typescriptをcheck
            await user.click(selectTypescript)
            expect(selectTypescript).toBeChecked()
            // TypescriptとReactをcheck
            await user.click(selectReact)
            expect(selectTypescript).toBeChecked()
            expect(selectReact).toBeChecked()
            // Typescriptのcheckを解除
            await user.click(selectTypescript)
            expect(selectTypescript).not.toBeChecked()
            expect(selectReact).toBeChecked()
        })
        it('絞り込みボタンを押下',async()=>{
            const consoleMock = jest.fn()
            global.console.log = consoleMock
            const selectMonth = screen.getByTestId('month')
            const selectJava = screen.getByRole('button',{name:"Java"})
            const selectTypescript = screen.getByRole('checkbox',{name:"TypeScript"})
            await user.selectOptions(selectMonth,'2023-07')
            await user.click(selectJava)
            await user.click(selectTypescript)
            const form = screen.getByRole('button',{name:"絞り込み"})
            await user.click(form)
            expect(consoleMock).toHaveBeenCalled()
            expect(consoleMock).toHaveBeenCalledTimes(1)
            expect(consoleMock).toHaveBeenCalledWith({ month: '2023-07', department: 'Java', skills: [ 'TypeScript' ] })
        })
    })
    describe('HistoriesListコンポーネントテスト',()=>{
        it('回答の状態に合わせて表示が変わる',async()=>{
            const projectsMock = [{id:1,name:'テスト1',detail:'テスト1の説明',enterprise_id:1,department_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'}]
            const answer_requestsMock=[{id:1,user_id:[1,2],administrator_id:5,project_id:1,request_at:'2023-07-10T16:52:46.053Z',deadline:"2023-07-10T16:52:46.053Z",created_user:'rakus',created_at:'2023-07-10T16:52:46.053Z',update_user:'rakus',update_at:'2023-07-10T16:52:46.053Z'},]
            const answersMock = [
                {id:1,context:'テスト回答1',question_id:1,answer_request_id:1,user_id:1,Model_answer_fl:false,created_user:'rakus',created_at:'2023-07-10T16:52:46.053Z',update_user:'rakus',update_at:'2023-07-11T16:52:46.053Z'},
                {id:2,context:'テスト回答2',question_id:1,answer_request_id:1,user_id:2,Model_answer_fl:false,created_user:'rakus',created_at:'2023-07-10T16:52:46.053Z',update_user:'rakus',update_at:'2023-07-10T16:52:46.053Z'},
            ]
            const usersMock = [
                {id:1,name:'テスト太郎',password:'test1',email:'test1@example.com',hire_date:'2023-01-01',department_id:1,status_id:1,created_user:'rakus',created_at:'2023-07-10T16:52:46.053Z',update_user:'rakus',update_at:'2023-07-10T16:52:46.053Z'},
                {id:2,name:'テスト次郎',password:'test2',email:'test2@example.com',hire_date:'2023-01-01',department_id:1,status_id:1,created_user:'rakus',created_at:'2023-07-10T16:52:46.053Z',update_user:'rakus',update_at:'2023-07-10T16:52:46.053Z'},
            ]
            render(<AppRouterContextProviderMock router={{ push }}><HistoriesList projects={projectsMock} answer_requests={answer_requestsMock} answers={answersMock} users={usersMock}/></AppRouterContextProviderMock>)
            const openButton = screen.getByTestId('open_1')
            await user.click(openButton)
            expect(screen.getByTestId('status_1').textContent).toBe('回答済み')
            expect(screen.getByTestId('status_2').textContent).toBe('未回答')
        })
    })
})
