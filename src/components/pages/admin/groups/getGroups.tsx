export const getGroup = async() => {
    const response = await fetch("http://localhost:8080/qa_system_api/groups",{
        cache:"no-cache"
    })
    const data = await response.json()
    const groupData = data.groupList
    // console.log(groupData)
    return groupData
}