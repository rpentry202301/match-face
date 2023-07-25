import {render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GroupsRegisterPage from '@/app/(pages)/admin/(other)/groups/register/page'
import React from 'react'
import "@testing-library/jest-dom"
import { UserSelectProvider } from '@/hooks/store/context/UserSelectContext'

// useContextをモーダルで使用しているため、Providerを追加しています

describe('管理者/グループ設定画面のテスト',()=>{
    const user = userEvent.setup()
    beforeEach(()=>{
        render(
            <UserSelectProvider>
                <GroupsRegisterPage/>
            </UserSelectProvider>
        )
    })
    describe('スナップショットテスト',()=>{
        it('レンダリング時',async()=>{
            const view = render(
                <UserSelectProvider>
                    <GroupsRegisterPage/>
                </UserSelectProvider>
            )
            expect(view.container).toMatchSnapshot()
        })
    })
    describe('モーダル表示テスト',()=>{
        it('グループを設定するボタン押下で確認表示',async()=>{
            const registerButton = screen.getByTestId('registerConfirm')
            await user.click(registerButton)
            const modalConfirmation = screen.getByText('グループを設定してよろしいですか?')
            expect(modalConfirmation).toBeInTheDocument
        })
    })
    describe('チーム名がブランク時の表示テスト',()=>{
        it('グループ名を入力するインプットが空白のままグループを設定するボタン押下でエラー表示',async()=>{
            const registerButton = screen.getByTestId('registerConfirm')
            const groupName = screen.getByTestId('groupName')
            const errorGroupName = screen.getByTestId("errorGroupName");
            user.clear(groupName)
            await user.click(registerButton)
            expect(errorGroupName).toBeInTheDocument
        })
    })
    
    // 実装を進めたら続きを書きますバリデーション
    // describe('グループ設定',()=>{
    //     it('設定するボタン押下で新規設定',async()=>{
    //         const registerButtonTrue =screen.getByTestId('registerTrue')
    //         await user.click(registerButtonTrue)
    //     })
    // })
})
