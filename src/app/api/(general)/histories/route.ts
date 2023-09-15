import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const userID = res.user_id;
  const month = res.month;
  const skill = res.skill;
  // 複数スキルのパラメーター
  let newSkills = "";
  for (let i = 0; i < skill.length; i++) {
    const element = skill[i];
    const combineSkills = `skillId=` + element + `&`;
    newSkills += combineSkills;
  }

  if (month && skill.length > 0) {
    console.log("if1", month, newSkills);
    const response = await fetch(
      `${process.env.BE_URL}/user/${userID}/answer_requests?${newSkills}&answerDate=${month}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } else if (month && skill.length === 0) {
    console.log("if2", month, skill);
    const response = await fetch(
      `${process.env.BE_URL}/user/${userID}/answer_requests?answerDate=${month}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } else if (!month && skill.length > 0) {
    console.log("if3", month, newSkills);
    const response = await fetch(
      `${process.env.BE_URL}user/${userID}/answer_requests?${newSkills}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } else {
    console.log("if4", month, skill);
    const response = await fetch(
      `${process.env.BE_URL}/user/${userID}/answer_requests`
    );
    const data = await response.json();
    return NextResponse.json(data);
  }
}
