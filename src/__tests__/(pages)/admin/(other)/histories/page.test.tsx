import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HistoriesPage from '@/app/(pages)/admin/(other)/histories/page'
import React from 'react'
import "@testing-library/jest-dom"
import {AppRouterContextProviderMock} from './app-router-context-provider-mock'
import { useRouter } from 'next/router'

describe('管理者/履歴一覧画面のテスト',() => {
    const user = userEvent.setup()
    const push = jest.fn()
    beforeEach(()=>{
        render(<AppRouterContextProviderMock router={{ push }}><HistoriesPage /></AppRouterContextProviderMock>);
    })

    describe('スナップショットテスト',() => {
        it('レンダリング時',async() => {
            const view = render(<HistoriesPage/>)
            expect(view.container).toMatchSnapshot()
        })
    })
    describe('リストテスト',()=>{
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
            expect(push).toBeCalledWith('/admin/review')
        })
    })
    describe('絞り込みテスト',()=>{
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
})
