import { NextResponse } from "next/server"

export async function GET(request:Request){
    const { searchParams } = new URL(request.url)
    const answerDate = searchParams.get('answerDate')
    const departmentId = searchParams.get('departmentId')
    const skillId= searchParams.get('skillId')
    let data
    if(answerDate!=='-01'&&departmentId!==''&&departmentId!==null&&skillId!==''&&skillId!==null){
        const departmentIdQuery = setSelectDepartments(departmentId)
        const skillIdQuery = setSelectSkills(skillId)
        const response = await fetch(`${process.env['BE_URL']}/answer_requests?answerDate=${answerDate}${departmentIdQuery}${skillIdQuery}`)
        if(!response.ok) throw new Error('Failed to fetch data')
        data = await response.json()
    }else if(answerDate!=='-01'){
        if(departmentId!==''&&departmentId!==null){
            const departmentIdQuery = setSelectDepartments(departmentId)
            const response = await fetch(`${process.env['BE_URL']}/answer_requests?answerDate=${answerDate}${departmentIdQuery}`)
            if(!response.ok) throw new Error('Failed to fetch data')
            data = await response.json()
        }else if(skillId!==''&&skillId!==null){
            const skillIdQuery = setSelectSkills(skillId)
            const response = await fetch(`${process.env['BE_URL']}/answer_requests?answerDate=${answerDate}${skillIdQuery}`)
            if(!response.ok) throw new Error('Failed to fetch data')
            data = await response.json()
        }else{
            const response = await fetch(`${process.env['BE_URL']}/answer_requests?answerDate=${answerDate}`)
            if(!response.ok) throw new Error('Failed to fetch data')
            data = await response.json()
        }
    }else if(departmentId!==''&&departmentId!==null){
        if(skillId!==''&&skillId!==null){
            const departmentIdQuery = setSelectDepartments(departmentId).slice(1)
            const skillIdQuery = setSelectSkills(skillId)
            const response = await fetch(`${process.env['BE_URL']}/answer_requests?${departmentIdQuery}${skillIdQuery}`)
            if(!response.ok) throw new Error('Failed to fetch data')
            data = await response.json()
        }else{
            const departmentIdQuery = setSelectDepartments(departmentId).slice(1)
            const response = await fetch(`${process.env['BE_URL']}/answer_requests?${departmentIdQuery}`)
            if(!response.ok) throw new Error('Failed to fetch data')
            data = await response.json()
        }
    }else if(skillId!==''&&skillId!==null){
        const skillIdQuery = setSelectSkills(skillId).slice(1)
        const response = await fetch(`${process.env['BE_URL']}/answer_requests?${skillIdQuery}`)
        if(!response.ok) throw new Error('Failed to fetch data')
        data = await response.json()
    }else{
        throw new Error('Failed to fetch data')
    }
    return NextResponse.json(data.answerRequests);
}


function setSelectSkills (skill:string){
    const skills = skill.split(',')
    let string_skill ='';
    for(let i =0; i<skills.length ;i++){
        string_skill = string_skill + `&skillId=` + String(skills[i])
    }
    return string_skill
}
function setSelectDepartments (department:string){
    const departments = department.split(',')
    let string_department ='';
    for(let i =0; i<departments.length ;i++){
        string_department = string_department + `&departmentId=` + String(departments[i])
    }
    return string_department
}
