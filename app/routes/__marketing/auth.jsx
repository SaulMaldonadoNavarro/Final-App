import { redirect } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { signup } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css';
import { login } from '../../data/auth.server';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      return login(credentials);
    } else {
      return signup(credentials);
    }
  } catch (error) {
    if (error === 401 || error === 422 || error == 403) {
      return { credentials: error.message };
    }
    return { credentials: error.message };
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}

export function headers({
  actionHeaders,
  loaderHeaders,
  parentHeaders
}){
  return{
    'Cache-Control': parentHeaders.get('Cache-Control')
  }
}