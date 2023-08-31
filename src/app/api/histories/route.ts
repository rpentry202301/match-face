import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const userID = res.user_id;
  const month = res.month;
  const skill = res.skill;
  console.log("コンソール", month, skill);
  if (month && skill) {
    console.log("if1", month, skill);
    const response = await fetch(
      `http://localhost:8080/qa_system_api/user/${userID}/answer_requests?answerDate=${month}&skillId=${skill}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } else if (month && !skill) {
    console.log("if2", month, skill);
    const response = await fetch(
      `http://localhost:8080/qa_system_api/user/${userID}/answer_requests?answerDate=${month}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } else if (!month && skill.length > 0) {
    console.log("if3", month, skill);
    const response = await fetch(
      `http://localhost:8080/qa_system_api/user/${userID}/answer_requests?skillId=${skill}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } else {
    console.log("if4", month, skill);
    const response = await fetch(
      `http://localhost:8080/qa_system_api/user/${userID}/answer_requests`
    );
    const data = await response.json();
    return NextResponse.json(data);
  }
}
