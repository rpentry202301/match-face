import { render,screen } from '@testing-library/react'
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
})