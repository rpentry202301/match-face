import { act, render,screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HistoriesPage from '@/app/(pages)/admin/(other)/histories/page'
import HistoriesSelect from '@/components/pages/admin/histories/select'
import React from 'react'
import "@testing-library/jest-dom"
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock'
import HistoriesList from '@/components/pages/admin/histories/list'
import { SelectHistoryProvider } from '@/hooks/store/context/historiesContext'
import { skillsMock, departmentsMock,answer_request_groupsMock } from './histories_test_mock'
import { SelectHistoryReducer } from '@/hooks/store/reducer/historiesReducer'

describe('管理者/履歴一覧画面のテスト',() => {
    const user = userEvent.setup()
    const push = jest.fn()
    global.fetch = jest.fn().mockImplementation((url,config)=>{
        if(url === '/api/admin/histories/departments'){
            return {
                ok:true,
                json: async () => (departmentsMock),
            }
        }else if(url === '/api/admin/histories/skills'){
            return {
                ok:true,
                json: async () => (skillsMock),
            }
        }else if(url === '/api/admin/histories'){
            return {
                ok:true,
                json: async () => (answer_request_groupsMock),
            }
        }
    })
    describe('スナップショットテスト',() => {
        it('レンダリング時',async() => {
            const view = render(
                <SelectHistoryProvider>
                    <HistoriesPage/>
                </SelectHistoryProvider>
            )
            await waitFor(()=>{
                expect(view.container).toMatchSnapshot()
            })
        })
    })      
    describe('リストテスト',()=>{
        beforeEach(async()=>{
            await act(()=>render(
                <SelectHistoryProvider>
                    <AppRouterContextProviderMock router={{ push }}>
                        <HistoriesSelect className={''}/>
                        <HistoriesList />
                    </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            ));
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
    describe('HistoriesListコンポーネントテスト',()=>{
        beforeEach(async()=>{
            await act(()=>render(
                <SelectHistoryProvider>
                <AppRouterContextProviderMock router={{ push }}>
                    <HistoriesList />
                </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            ))
        })
        it('説明文の長さに合わせて表示が変わる',async()=>{
            await waitFor(async()=>{
                expect(screen.getByTestId('project_detail_2').textContent).toBe('テスト2の説明(文字数34)テスト2の説明テスト2の説明テスト2の説明');
                expect(screen.getByTestId('project_detail_3').textContent).toBe('テスト3の説明(文字数35)テスト3の説明テスト3の説明テスト3の説明...');
            })
            })
        it('回答の状態に合わせて表示が変わる',async()=>{
            await waitFor(async()=>{
                const openButton = screen.getByTestId('open_1')
                await user.click(openButton)
                expect(screen.getByTestId('status_1').textContent).toBe('回答済み')
                expect(screen.getByTestId('status_2').textContent).toBe('未回答')
            })
        })
    })
    describe('Reducerのテスト',()=>{
        const result = SelectHistoryReducer({ month: '', department:[], skills:[] }, {
          type: "select",
          payload: { month: '', department:[], skills:[] }
        })
        expect(result).toEqual({ month: '', department:[], skills:[] })
    })
})
   