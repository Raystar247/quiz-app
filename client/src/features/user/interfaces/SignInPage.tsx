import { Glasslike } from "../../../components/glasslike";
import { useFormLogic } from "../hooks/useFormLogic";
import { useUserController } from "../hooks/useUserController";

const SignInPage: React.FC = () => {
  const { form, changeForm } = useFormLogic({ email: '', password: '' });
  const { handleSubmit } = useUserController(form);
  
  return (
    <Glasslike as="div" colorScheme="white" hoverEffect={false} className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6 m-[2rem] mt-10" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Log in
        </h2>
        <p className="mt-1 text-center text-sm text-gray-500">
          アカウント情報を入力してください
        </p>
      </div>
      <form className="space-y-4" >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
            placeholder="your@example.com"
            name='email'
            onChange={changeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
            placeholder="********"
            name='password'
            onChange={changeForm}
            required
          />
        </div>

        <Glasslike as="button"
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          centerContent
        >
          Sign in
        </Glasslike>
      </form>

      <div className="text-center text-sm text-gray-600">
        アカウントを持っていない方は{" "}
        <a href="/signup" className="text-indigo-600 hover:underline">
          ユーザー登録
        </a>
      </div>
    </Glasslike>
  );
};

export default SignInPage;