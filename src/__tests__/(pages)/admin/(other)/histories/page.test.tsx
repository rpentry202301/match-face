import { render,screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HistoriesPage from '@/app/(pages)/admin/(other)/histories/page'
import HistoriesSelect from '@/components/pages/admin/histories/select'
import React from 'react'
import "@testing-library/jest-dom"
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock'
import HistoriesList from '@/components/pages/admin/histories/list'
import { SelectHistoryProvider } from '@/hooks/store/context/historiesContext'
import { projectsMock,answer_requestsMock,answersMock,usersMock,answer_request_questionsMock,project_skillsMock, skillsMock, departmentsMock } from './histories_test_mock'

describe('管理者/履歴一覧画面のテスト',() => {
    const user = userEvent.setup()
    const push = jest.fn()

    describe('スナップショットテスト',() => {
        it('レンダリング時',async() => {
            const view = render(
                <SelectHistoryProvider>
                    <HistoriesPage/>
                </SelectHistoryProvider>
            )
            expect(view.container).toMatchSnapshot()
        })
    })
    describe('リストテスト',()=>{
        beforeEach(()=>{
            render(
                <SelectHistoryProvider>
                    <AppRouterContextProviderMock router={{ push }}>
                    <HistoriesSelect className={''} projects={projectsMock} answer_requests={answer_requestsMock} departments={departmentsMock} skills={skillsMock}/>
                    <HistoriesList projects={projectsMock} answer_requests={answer_requestsMock} answers={answersMock} users={usersMock} answer_request_questions={answer_request_questionsMock} project_skills={project_skillsMock}/>
                    </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            );
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
            render(
                <SelectHistoryProvider>
                    <AppRouterContextProviderMock router={{ push }}>
                        <HistoriesSelect className={''} projects={projectsMock} answer_requests={answer_requestsMock} departments={departmentsMock} skills={skillsMock}/>
                        <HistoriesList projects={projectsMock} answer_requests={answer_requestsMock} answers={answersMock} users={usersMock} answer_request_questions={answer_request_questionsMock} project_skills={project_skillsMock}/>
                    </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            );
        })
        describe('選択内容のテスト',()=>{
            it('回答月の選択',async()=>{
                const beforeSelectMonth = screen.getByRole("option",{name:"--"}) as HTMLOptionElement
                expect(beforeSelectMonth.selected).toBe(true)
                await user.selectOptions(screen.getByTestId('month'),'2023-07')
                const selectMonth = screen.getByRole("option",{name:"2023-07"}) as HTMLOptionElement
                expect(selectMonth.selected).toBe(true)
                expect(beforeSelectMonth.selected).toBe(false)
            })
            it('職種の選択',async()=>{
                const selectFR = screen.getByRole('button',{name:"FR"})
                await user.click(selectFR)
                expect(selectFR).toHaveClass("bg-deep-gray")
                await user.click(selectFR)
                expect(selectFR).toHaveClass("bg-white")
            })
            it('技術の選択',async()=>{
                const selectJavaScript = screen.getByRole('checkbox',{name:"JavaScript"})
                const selectTypeScript = screen.getByRole('checkbox',{name:"TypeScript"})
                // JavaScriptをcheck
                await user.click(selectJavaScript)
                expect(selectJavaScript).toBeChecked()
                // JavaScriptとTypeScriptをcheck
                await user.click(selectTypeScript)
                expect(selectJavaScript).toBeChecked()
                expect(selectTypeScript).toBeChecked()
                // JavaScriptのcheckを解除
                await user.click(selectJavaScript)
                expect(selectJavaScript).not.toBeChecked()
                expect(selectTypeScript).toBeChecked()
            })
        })
        describe('データ表示のテスト',()=>{
            it('回答月の選択',async()=>{
                const selectMonth = screen.getByTestId('month')
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test5 = screen.getByText('テスト5')
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(form)
                expect(test1).toBeInTheDocument()
                expect(test5).not.toBeInTheDocument()
                await user.selectOptions(selectMonth,'2023-08')
                await user.click(form)
                waitFor(()=>{
                expect(test1).not.toBeInTheDocument()
                expect(test5).toBeInTheDocument()
                })
            })
            it('職種の選択',async()=>{
                const selectJava = screen.getByRole('button',{name:"Java"})
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test4 = screen.getByText('テスト4')    
                await user.click(selectJava)
                await user.click(form)
                expect(test1).not.toBeInTheDocument()
                expect(test4).toBeInTheDocument()
            })
            it('スキルの選択',async()=>{
                const selectJavaScript = screen.getByRole('checkbox',{name:"JavaScript"})
                const selectTypeScript = screen.getByRole('checkbox',{name:"TypeScript"})
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test2 = screen.getByText('テスト2')
                const test3 = screen.getByText('テスト3')
                await user.click(selectJavaScript)
                await user.click(selectTypeScript)
                await user.click(form)
                expect(test1).toBeInTheDocument()
                expect(test2).toBeInTheDocument()
                expect(test3).toBeInTheDocument()
                await user.click(selectTypeScript)
                await user.click(form)
                waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test2).toBeInTheDocument()
                    expect(test3).not.toBeInTheDocument()
                })
                await user.click(selectJavaScript)
                await user.click(form)
                waitFor(()=>{
                    expect(test1).not.toBeInTheDocument()
                    expect(test2).toBeInTheDocument()
                    expect(test3).toBeInTheDocument()
                })
            })
            it('回答月+職種の選択',async()=>{
                const selectMonth = screen.getByTestId('month')
                const selectFR = screen.getByRole('button',{name:"FR"})
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test4 = screen.getByText('テスト4')
                const test5 = screen.getByText('テスト5')
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(selectFR)
                await user.click(form)
                expect(test1).toBeInTheDocument()
                expect(test4).not.toBeInTheDocument()
                expect(test5).not.toBeInTheDocument()
            })
            it('回答月+スキルの選択',async()=>{
                const selectMonth = screen.getByTestId('month')
                const selectJavaScript = screen.getByRole('checkbox',{name:"JavaScript"})
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test3 = screen.getByText('テスト3')
                const test5 = screen.getByText('テスト5')
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(selectJavaScript)
                await user.click(form)
                expect(test1).toBeInTheDocument()
                expect(test3).not.toBeInTheDocument()
                expect(test5).not.toBeInTheDocument()
            })
            it('職種+スキルの選択',async()=>{
                const selectFR = screen.getByRole('button',{name:"FR"})
                const selectJavaScript = screen.getByRole('checkbox',{name:"JavaScript"})
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test3 = screen.getByText('テスト3')
                const test4 = screen.getByText('テスト4')
                await user.click(selectFR)
                await user.click(selectJavaScript)
                await user.click(form)
                expect(test1).toBeInTheDocument()
                expect(test3).not.toBeInTheDocument()
                expect(test4).not.toBeInTheDocument()
            })
            it('回答月+職種+スキルの選択',async()=>{
                const selectMonth = screen.getByTestId('month')
                const selectFR = screen.getByRole('button',{name:"FR"})
                const selectJavaScript = screen.getByRole('checkbox',{name:"JavaScript"})
                const form = screen.getByRole('button',{name:"絞り込み"})
                const test1 = screen.getByText('テスト1')
                const test3 = screen.getByText('テスト3')
                const test4 = screen.getByText('テスト4')
                const test5 = screen.getByText('テスト5')
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(selectFR)
                await user.click(selectJavaScript)
                await user.click(form)
                expect(test1).toBeInTheDocument()
                expect(test3).not.toBeInTheDocument()
                expect(test4).not.toBeInTheDocument()
                expect(test5).not.toBeInTheDocument()
            })
            it('未選択',async()=>{
                const form = screen.getByRole('button',{name:"絞り込み"})
                await user.click(form)
                const test1 = screen.getByText('テスト1')
                const test2 = screen.getByText('テスト2')
                const test3 = screen.getByText('テスト3')
                const test4 = screen.getByText('テスト4')
                const test5 = screen.getByText('テスト5')
                expect(test1).toBeInTheDocument()
                expect(test2).toBeInTheDocument()
                expect(test3).toBeInTheDocument()
                expect(test4).toBeInTheDocument()
                expect(test5).toBeInTheDocument()
            })
        })
        })
    describe('HistoriesListコンポーネントテスト',()=>{
        beforeEach(async()=>{
            render(
                <SelectHistoryProvider>
                <AppRouterContextProviderMock router={{ push }}>
                    <HistoriesList projects={projectsMock} answer_requests={answer_requestsMock} answers={answersMock} users={usersMock} answer_request_questions={answer_request_questionsMock} project_skills={project_skillsMock}/>
                </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            )
            const openButton = screen.getByTestId('open_1')
            await user.click(openButton)
        })
        it('説明文の長さに合わせて表示が変わる',async()=>{
            expect(screen.getByTestId('project_detail_2').textContent).toBe('テスト2の説明(文字数34)テスト2の説明テスト2の説明テスト2の説明')
            expect(screen.getByTestId('project_detail_3').textContent).toBe('テスト3の説明(文字数35)テスト3の説明テスト3の説明テスト3の説明...')
        })
        it('回答の状態に合わせて表示が変わる',async()=>{
            expect(screen.getByTestId('status_1').textContent).toBe('回答済み')
            expect(screen.getByTestId('status_2').textContent).toBe('未回答')
        })
    })
    
})
