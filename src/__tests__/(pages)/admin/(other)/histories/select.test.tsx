
 import { act, render,screen, waitFor } from '@testing-library/react'
 import userEvent from '@testing-library/user-event'
 import HistoriesSelect from '@/components/pages/admin/histories/select'
 import React from 'react'
 import "@testing-library/jest-dom"
 import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock'
 import HistoriesList from '@/components/pages/admin/histories/list'
 import { SelectHistoryProvider } from '@/hooks/store/context/historiesContext'
import { answer_request_groupsMock, departmentsMock, skillsMock } from './histories_test_mock'
 describe('select',()=>{ 
    const user = userEvent.setup()
    const push = jest.fn()  
    let test1:Element;
    let test2:Element;
    let test3:Element;
    let test4:Element;
    let test5:Element;
    let form:HTMLFormElement;
    let selectMonth:HTMLOptionElement;
    let selectFR:HTMLInputElement;
    let selectJavaScript:HTMLInputElement;
    describe('絞り込みテスト',()=>{
        beforeEach(async () => {
            global.fetch = jest.fn().mockImplementation((url,config)=>{
                if(url === 'http://localhost:3000/api/admin/histories/departments'){
                    return {ok:true,json: async () => (departmentsMock)}
                }else if(url === 'http://localhost:3000/api/admin/histories/skills'){
                    return {ok:true,json: async () => (skillsMock)}
                }else if(url === 'http://localhost:3000/api/admin/histories'){
                    return {ok:true,json: async () => (answer_request_groupsMock)}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=2023-07-01&departmentId=&skillId='){
                    return {ok:true,json: async () => ([answer_request_groupsMock[0],answer_request_groupsMock[1],answer_request_groupsMock[2],answer_request_groupsMock[3]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=2023-08-01&departmentId=&skillId='){
                    return {ok:true,json: async () => ([answer_request_groupsMock[4]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=-01&departmentId=2&skillId='){
                    return {ok:true,json: async () => ([answer_request_groupsMock[3]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=-01&departmentId=&skillId=1,2'){
                    return {ok:true,json: async () => (answer_request_groupsMock)}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=-01&departmentId=&skillId=1'){
                return {ok:true,json: async () => ([answer_request_groupsMock[0],answer_request_groupsMock[1]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=2023-07-01&departmentId=1&skillId='){
                    return {ok:true,json: async () => ([answer_request_groupsMock[0],answer_request_groupsMock[1],answer_request_groupsMock[2]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=2023-07-01&departmentId=&skillId=1'){
                    return {ok:true,json: async () => ([answer_request_groupsMock[0],answer_request_groupsMock[1],answer_request_groupsMock[3]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=-01&departmentId=1&skillId=1'){
                    return {ok:true,json: async () => ([answer_request_groupsMock[0],answer_request_groupsMock[1],answer_request_groupsMock[4]])}
                }else if(url === 'http://localhost:3000/api/admin/histories/select?answerDate=2023-07-01&departmentId=1&skillId=1'){
                    return {ok:true,json: async () => ([answer_request_groupsMock[0],answer_request_groupsMock[1]])}
                }
            })
            await act(()=>render(
                <SelectHistoryProvider>
                    <AppRouterContextProviderMock router={{ push }}>
                        <HistoriesSelect className={''}/>
                        <HistoriesList />
                    </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            ));
            await waitFor(()=>{    
                test1 = screen.getByText('テスト1')
                test2 = screen.getByText('テスト2')
                test3 = screen.getByText('テスト3')
                test4 = screen.getByText('テスト4')
                test5 = screen.getByText('テスト5')
                form = screen.getByRole('button',{name:"絞り込み"})
                selectMonth = screen.getByTestId('month')
                selectFR = screen.getByRole('checkbox',{name:"FR"})
                selectJavaScript = screen.getByRole('checkbox',{name:"JavaScript"})
            })
        })
        describe('選択内容のテスト',()=>{
            it('回答月の選択',async()=>{
                const beforeSelectMonth:HTMLOptionElement = screen.getByRole("option",{name:"--"})
                expect(beforeSelectMonth.selected).toBe(true)
                await user.selectOptions(screen.getByTestId('month'),'2023-07')
                const selectJuly:HTMLOptionElement = screen.getByRole("option",{name:"2023-07"})
                expect(selectJuly.selected).toBe(true)
                expect(beforeSelectMonth.selected).toBe(false)
            })
            it('職種の選択',async()=>{
                await user.click(selectFR)
                expect(selectFR).toBeChecked()
                await user.click(selectFR)
                expect(selectFR).not.toBeChecked()
            })
            it('技術の選択',async()=>{
                const selectTypeScript = screen.getByRole('checkbox',{name:"TypeScript"})
                // JavaScriptとTypeScriptをcheck
                await user.click(selectTypeScript)
                await user.click(selectJavaScript)
                expect(selectJavaScript).toBeChecked()
                expect(selectTypeScript).toBeChecked()
                // JavaScriptのcheckを解除
                await user.click(selectJavaScript)
                expect(selectJavaScript).not.toBeChecked()
                expect(selectTypeScript).toBeChecked()
            })
        })
        describe('絞り込みapiリクエストのテスト',()=>{
            it('回答月の選択',async()=>{
                const form = screen.getByRole('button',{name:"絞り込み"})
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(form)
                await waitFor (()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test5).not.toBeInTheDocument()
                })
                await user.selectOptions(selectMonth,'2023-08')
                await user.click(form)
                test5 = screen.getByText('テスト5')
                await waitFor (()=>{
                    expect(test1).not.toBeInTheDocument()
                    expect(test5).toBeInTheDocument()
                })
            })
            it('職種の選択',async()=>{
                const selectJava = screen.getByRole('checkbox',{name:"Java"})
                await user.click(selectJava)
                await user.click(form)
                await waitFor (()=>{
                    expect(test1).not.toBeInTheDocument()
                    expect(test4).toBeInTheDocument()
                })
            })
            it('スキルの選択',async()=>{
                const selectTypeScript = screen.getByRole('checkbox',{name:"TypeScript"})
                await user.click(selectJavaScript)
                await user.click(selectTypeScript)
                await user.click(form)
                await waitFor (()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test2).toBeInTheDocument()
                    expect(test3).toBeInTheDocument()
                })
                await user.click(selectTypeScript)
                await user.click(form)
                await waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test2).toBeInTheDocument()
                    expect(test3).not.toBeInTheDocument()
                })
            })
            it('回答月+職種の選択',async()=>{
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(selectFR)
                await user.click(form)
                await waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test4).not.toBeInTheDocument()
                    expect(test5).not.toBeInTheDocument()
                })
            })
            it('回答月+スキルの選択',async()=>{
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(selectJavaScript)
                await user.click(form)
                await waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test3).not.toBeInTheDocument()
                    expect(test5).not.toBeInTheDocument()
                })
            })
            it('職種+スキルの選択',async()=>{
                await user.click(selectFR)
                await user.click(selectJavaScript)
                await user.click(form)
                await waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test3).not.toBeInTheDocument()
                    expect(test4).not.toBeInTheDocument()
                })
            })
            it('回答月+職種+スキルの選択',async()=>{
                await user.selectOptions(selectMonth,'2023-07')
                await user.click(selectFR)
                await user.click(selectJavaScript)
                await user.click(form)
                await waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test3).not.toBeInTheDocument()
                    expect(test4).not.toBeInTheDocument()
                    expect(test5).not.toBeInTheDocument()
                })
            })
            it('未選択',async()=>{
                await user.click(form)
                await waitFor(()=>{
                    expect(test1).toBeInTheDocument()
                    expect(test2).toBeInTheDocument()
                    expect(test3).toBeInTheDocument()
                    expect(test4).toBeInTheDocument()
                    expect(test5).toBeInTheDocument()
                })
            })
        })
    })
})
