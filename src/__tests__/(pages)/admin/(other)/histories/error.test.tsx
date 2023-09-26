import HistoriesSelect from '@/components/pages/admin/histories/select'
import "@testing-library/jest-dom"
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock'
import HistoriesList from '@/components/pages/admin/histories/list'
import { SelectHistoryProvider } from '@/hooks/store/context/historiesContext'
import { render,screen, waitFor } from '@testing-library/react'
import { answer_request_groupsMock, departmentsMock, skillsMock } from './histories_test_mock'
import userEvent from '@testing-library/user-event'

describe('データ通信エラーテスト',()=>{
    const push = jest.fn()
    afterEach(()=>jest.restoreAllMocks())
    describe('初期表示のエラーテスト',()=>{
        it('リストの初期表示のエラー',async()=>{
            global.fetch = jest.fn().mockImplementation((url,config)=>{
                if(url==='/api/admin/histories'){
                return {ok:false}}
            })
            render(
                <SelectHistoryProvider>
                    <AppRouterContextProviderMock router={{ push }}>
                        <HistoriesList />
                    </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            );
            await waitFor(()=>{
                const error = screen.getByText('データの取得に失敗しました')
                expect(error).toBeInTheDocument()
            })
        })
        it('選択項目の初期表示のエラー',async()=>{
            global.fetch = jest.fn().mockImplementation((url,config)=>{
                return {ok:false}
            })
            render(
                <SelectHistoryProvider>
                    <AppRouterContextProviderMock router={{ push }}>
                        <HistoriesSelect className={''} />
                    </AppRouterContextProviderMock>
                </SelectHistoryProvider>
            );
            await waitFor(()=>{
                const error = screen.getByText('データの取得に失敗しました')
                expect(error).toBeInTheDocument()
            })
        })
    })
    describe('絞り込みのエラーテスト',()=>{
        const user = userEvent.setup()
        let form:HTMLFormElement;
        let selectFR:HTMLInputElement;
        it('絞り込みボタン押下後にデータの取得に失敗',async()=>{
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
                }else{
                    return {ok:false}
                }
            })
            render(
                <SelectHistoryProvider>
                        <AppRouterContextProviderMock router={{ push }}>
                            <HistoriesSelect className={''}/>
                            <HistoriesList />
                        </AppRouterContextProviderMock>
                    </SelectHistoryProvider>
            );
            await waitFor(()=>{
                form = screen.getByRole('button',{name:"絞り込み"})
                selectFR =  screen.getByRole('checkbox',{name:"FR"})
            })
            await user.click(selectFR)
            await user.click(form)
            await waitFor(()=>{
                const error = screen.getByText('絞り込みに失敗しました')
                expect(error).toBeInTheDocument()
            })
        })
    })
})
