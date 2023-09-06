export const getGroup = async() => {

    const url = process.env.BE_URL

     // 確認用(うまくいかないので一旦、放置)
    //  const checkData = async() => {
    //     const response = await fetch('http://localhost:3000/api/admin/groups',{cache:"no-cache"})
    //     const data = await response.json()
    //     console.log('いま確認用',data)
    // }
    // checkData()

    const response = await fetch(`http://localhost:8080/qa_system_api/groups`,{
        cache:"no-cache"
    })
    const data = await response.json()
    const groupData = data.groupList
    const formattedData = groupData.map((item:any) =>{
        const createdAtDate = new Date(item.createdAt)
        const formattedCreatedAt = createdAtDate.toISOString().split('T')[0]
        
        let formattedUpdatedAt = "9999-12-31"
        if(item.updateAt !== "-999999999-01-01T00:00:00"){
            const updateAtDate = new Date(item.updateAt)
            formattedUpdatedAt = updateAtDate.toISOString().split('T')[0]
        } else{

        }

        return{
            ...item,
            createdAt:formattedCreatedAt,
            updateAt:formattedUpdatedAt,
        }
    })
    console.log('formattedData',formattedData)
    console.log('url',process.env['BE_URL'])
    return formattedData
}