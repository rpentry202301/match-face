import {render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GroupsRegisterPage from '@/app/(pages)/admin/(other)/groups/register/page'
import React from 'react'
import "@testing-library/jest-dom"

describe('管理者/グループ設定画面のテスト',()=>{
    const user = userEvent.setup()
    beforeEach(()=>{
        render(<GroupsRegisterPage/>)
    })
    describe('スナップショットテスト',()=>{
        it('レンダリング時',async()=>{
            const view = render(<GroupsRegisterPage/>)
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
    
    // 実装を進めたら続きを書きます
    // describe('グループ設定',()=>{
    //     it('設定するボタン押下で新規設定',async()=>{
    //         const registerButtonTrue =screen.getByTestId('registerTrue')
    //         await user.click(registerButtonTrue)
    //     })
    // })
})