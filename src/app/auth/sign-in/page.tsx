import { getCsrfToken } from 'next-auth/react';

export default async function SignIn() {
  const csrfToken = await getCsrfToken();
  // console.log('csrfToken', csrfToken);
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input
        name="csrfToken"
        type="hidden"
        defaultValue={csrfToken}
        className=" border-2 border-black"
      />
      <label>
        Username
        <input name="username" type="text" className=" border-2 border-black" />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          className=" border-2 border-black"
        />
      </label>
      <button type="submit" className=" border-2 border-black bg-red">
        Sign in
      </button>
    </form>
  );
}
