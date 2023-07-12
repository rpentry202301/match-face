import {render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GroupsPage from '@/app/(pages)/admin/(other)/groups/page'
import React from 'react'
import "@testing-library/jest-dom"

describe('管理者/グループ一覧画面のテスト',()=>{
    const user = userEvent.setup()
    beforeEach(()=>{
        render(<GroupsPage/>)
    })
    describe('スナップショットテスト',()=>{
        it('レンダリング時',async()=>{
            const view = render(<GroupsPage/>)
            expect(view.container).toMatchSnapshot()
        })
    })
    describe('モーダル表示テスト',()=>{
        it('グループ名押下で詳細表示',async()=>{
            const groupName = screen.getByTestId('group_1')
            await user.click(groupName)
            const modalTabel = screen.getByTestId('modalTable')
            expect(modalTabel).toBeInTheDocument
        })
    })

    describe('新規グループ設定ページへの遷移',()=>{
        it('ボタン押下でページ遷移',async()=>{
            const registerButton =screen.getByTestId('register')
            expect(registerButton).toHaveAttribute("href","/admin/groups/register")
        })
    })
})